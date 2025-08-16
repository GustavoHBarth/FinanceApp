using FinanceApp.Application.Services;
using FinanceApp.Application.Services.Interfaces;
using FinanceApp.Data.Repositories;
using FinanceApp.Domain.Interfaces;
using FinanceApp.Data.Context;
using FinanceApp.API.Extensions;
using Microsoft.OpenApi.Models;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Configuração de serviços
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IContaService, ContaService>();
builder.Services.AddScoped<IReceitaService, ReceitaService>();
builder.Services.AddScoped<IParcelaService, ParcelaService>();
builder.Services.AddScoped<IAuthService, AuthService>();

// Configuração do banco de dados
builder.Services.AddFinanceAppDatabase(builder.Configuration);

// Configuração do JWT
builder.Services.ConfigureJsonWebToken(builder.Configuration);

// CORS para o frontend em http://localhost:5173
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Configuração de controllers
builder.Services.AddControllers();

// Configuração do Swagger com JWT
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo 
    { 
        Title = "FinanceApp API", 
        Version = "v1",
        Description = "API para controle financeiro pessoal"
    });

    // Configuração do Bearer Token
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

var app = builder.Build();

// Configuração do pipeline HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "FinanceApp API v1");
        // c.RoutePrefix = string.Empty; // Comentado para usar caminho padrão
    });
}

app.UseHttpsRedirection();
app.UseCors("Frontend");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();
