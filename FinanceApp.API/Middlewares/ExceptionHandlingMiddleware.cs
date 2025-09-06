using FinanceApp.Application.Exceptions;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;

namespace FinanceApp.API.Middlewares
{
    public class ExceptionHandlingMiddleware
    {
        public readonly RequestDelegate _next;

        public ExceptionHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
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

        private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var statusCode = exception switch
            {
                ValidationAppException => (int)HttpStatusCode.BadRequest,    // 400
                UnauthorizedAccessException => (int)HttpStatusCode.Unauthorized, // 401
                ForbiddenAccessException => (int)HttpStatusCode.Forbidden,   // 403
                NotFoundException => (int)HttpStatusCode.NotFound,           // 404
                _ => (int)HttpStatusCode.InternalServerError
            };


            var problem = new ProblemDetails
            {
                Title = GetTitle(statusCode),
                Detail = exception.Message,
                Status = statusCode,
                Instance = context.Request.Path
            };

            if (exception is ValidationAppException vex && vex.Errors?.Any() == true)
            {
                problem.Extensions["errors"] = vex.Errors;
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
    }
}
