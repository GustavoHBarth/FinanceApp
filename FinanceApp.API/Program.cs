using FinanceApp.Application.Services;
using FinanceApp.Application.Services.Interfaces;
using FinanceApp.Data.Repositories;
using FinanceApp.Domain.Interfaces;
using FinanceApp.Data.Context;
// using FinanceApp.Data.Interfaces; // Removido pois não é mais necessário

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IContaService, ContaService>();
builder.Services.AddFinanceAppDatabase(builder.Configuration);

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
