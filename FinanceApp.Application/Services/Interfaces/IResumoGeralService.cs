using FinanceApp.Application.DTOs.Resumo;
using FinanceApp.Domain.Enums;

namespace FinanceApp.Application.Services.Interfaces
{
    public interface IResumoGeralService
    {
        Task<ReceitasDashboardDTO> GetReceitasDashboardAsync(Guid userId, int month, int year, EnumStatusReceita? status = null, CancellationToken ct = default);
    }
}
