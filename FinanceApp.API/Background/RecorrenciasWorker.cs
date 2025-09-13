using FinanceApp.Application.Services.Interfaces;
using FinanceApp.Domain.Entities;
using FinanceApp.Domain.Interfaces;

namespace FinanceApp.API.Background
{
    public class RecorrenciasWorker : BackgroundService
    {
        private readonly IServiceProvider _services;
        private readonly ILogger<RecorrenciasWorker> _logger;

        public RecorrenciasWorker(IServiceProvider services, ILogger<RecorrenciasWorker> logger)
        {
            _services = services;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while(!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    using var scope = _services.CreateScope();
                    var regraRepo = scope.ServiceProvider.GetRequiredService<IRepository<ReceitaRecorrencia>>();
                    var recorrenciaService = scope.ServiceProvider.GetRequiredService<IRecorrenciaService>();

                    var userIds = regraRepo.GetAll()
                        .Where(r => r.Ativa && !r.SysIsDeleted)
                        .Select(r => r.UserId)
                        .Distinct()
                        .ToList();

                    foreach (var userId in userIds)
                    {
                        await recorrenciaService.GerarPendentes(userId, DateTime.UtcNow, stoppingToken);
                    }

                    _logger.LogInformation("RecorrenciasWorker: geração concluída para {Count} usuários", userIds.Count);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "RecorrenciasWorker: erro ao gerar recorrências");
                }

                await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
            }
        }
    }
}
