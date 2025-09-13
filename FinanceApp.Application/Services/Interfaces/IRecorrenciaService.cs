using System.Threading;

namespace FinanceApp.Application.Services.Interfaces
{
    public interface IRecorrenciaService
    {
        Task<int> GerarPendentes(Guid userId, DateTime ateDataUtc, CancellationToken ct = default);
    }
}
