using FinanceApp.Application.DTOs;

namespace FinanceApp.Application.Services.Interfaces
{
    public interface IContaService
    {
        Task<List<ContaDTO>> GetContas(Guid userId, int? month = null, int? year = null);
        Task<ContaDTO> CreateContaAsync(CreateContaRequestDTO dto, Guid userId);
        Task<ContaDTO> GetContasById(Guid contaId, Guid userId);
        Task<ContaDTO> UpdateContaAsync(Guid id, UpdateContaRequestDTO dto, Guid userId);
        Task DeleteContaAsync(Guid id, Guid userId, bool deleteParcelas = false);
    }
}
