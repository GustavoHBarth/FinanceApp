using FinanceApp.Application.DTOs;

namespace FinanceApp.Application.Services.Interfaces
{
    public interface IReceitaService
    {
        Task<List<ReceitaDTO>> GetReceitas(Guid userId);
        Task<ReceitaDTO> CreateReceitaAsync(CreateReceitaRequestDTO dto, Guid userId);
        Task<ReceitaDTO> GetReceitaById(Guid receitaId, Guid userId);
        Task<ReceitaDTO> UpdateReceitaAsync(Guid id, UpdateReceitaRequestDTO dto, Guid userId);
        Task DeleteReceitaAsync(Guid id, Guid userId);
    }
} 