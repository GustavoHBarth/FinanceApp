using FinanceApp.Application.Exceptions;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Hosting;

namespace FinanceApp.API.Middlewares
{
    public class ExceptionHandlingMiddleware
    {
        public readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;
        private readonly IWebHostEnvironment _env;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger, IWebHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var statusCode = exception switch
            {
                OperationCanceledException => 499,
                ValidationAppException => (int)HttpStatusCode.BadRequest,    // 400
                UnauthorizedAccessException => (int)HttpStatusCode.Unauthorized, // 401
                ForbiddenAccessException => (int)HttpStatusCode.Forbidden,   // 403
                NotFoundException => (int)HttpStatusCode.NotFound,           // 404
                _ => (int)HttpStatusCode.InternalServerError
            };


            var detail = (statusCode == 500 && !_env.IsDevelopment())
                ? "Ocorreu um erro interno. Tente novamente mais tarde."
                : statusCode == 499
                    ? "A requisição foi cancelada."
                    : exception.Message;

            var problem = new ProblemDetails
            {
                Title = GetTitle(statusCode),
                Detail = detail,
                Status = statusCode,
                Instance = context.Request.Path,
                Type = GetTypeUri(statusCode)
            };

            if (exception is ValidationAppException vex && vex.Errors?.Any() == true)
            {
                problem.Extensions["errors"] = vex.Errors;
            }

            problem.Extensions["traceId"] = context.TraceIdentifier;

            if (statusCode >= 500)
            {
                _logger.LogError(exception, "Unhandled exception processed by middleware. StatusCode: {StatusCode}; TraceId: {TraceId}; Path: {Path}", statusCode, context.TraceIdentifier, context.Request.Path);
            }
            else if (statusCode == 499)
            {
                _logger.LogInformation("Request canceled by client. TraceId: {TraceId}; Path: {Path}", context.TraceIdentifier, context.Request.Path);
            }
            else
            {
                _logger.LogWarning(exception, "Handled exception. StatusCode: {StatusCode}; TraceId: {TraceId}; Path: {Path}", statusCode, context.TraceIdentifier, context.Request.Path);
            }

            context.Response.ContentType = "application/problem+json";
            context.Response.StatusCode = statusCode;

            var json = JsonSerializer.Serialize(problem, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });

            await context.Response.WriteAsync(json);
        }

        private static string GetTitle(int statusCode) => statusCode switch
        {
            400 => "Bad Request",
            401 => "Unauthorized",
            403 => "Forbidden",
            404 => "Not Found",
            500 => "Internal Server Error",
            _ => "Error"
        };

        private static string GetTypeUri(int statusCode)
        {
            return $"https://httpstatuses.com/{statusCode}";
        }
    }
}
