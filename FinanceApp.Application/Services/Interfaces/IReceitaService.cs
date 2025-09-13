using FinanceApp.Application.DTOs.Receita;
using FinanceApp.Application.Responses;

namespace FinanceApp.Application.Services.Interfaces
{
    public interface IReceitaService
    {
        Task<PagedResultDTO<ReceitaDTO>> GetReceitas(Guid userId, ReceitaParamsDTO query, CancellationToken ct = default);
        Task<ReceitaDTO> CreateReceitaAsync(CreateReceitaRequestDTO dto, Guid userId, CancellationToken ct = default);
        Task<ReceitaDTO> GetReceitaById(Guid receitaId, Guid userId);
        Task<ReceitaDTO> UpdateReceitaAsync(Guid id, UpdateReceitaRequestDTO dto, Guid userId, CancellationToken ct = default);
        Task DeleteReceitaAsync(Guid id, Guid userId, CancellationToken ct = default);
    }
} 