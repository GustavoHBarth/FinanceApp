using FinanceApp.Data;
using Microsoft.EntityFrameworkCore;
using FinanceApp.Application.Services.Interfaces;
using FinanceApp.Application.Services;
using FinanceApp.Data.Repositories;
using FinanceApp.Domain.Interfaces;
using FinanceApp.Data.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Configuração da conexão com SQL Server
builder.Services.AddDbContext<UnitOfWork>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

builder.Services.AddScoped<IContasService, ContasService>();

// Unit of Work: o próprio DbContext implementa IUnitOfWork
builder.Services.AddScoped<IUnitOfWork>(provider =>
    provider.GetRequiredService<UnitOfWork>());

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
