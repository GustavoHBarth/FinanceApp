using FinanceApp.Application.DTOs;

namespace FinanceApp.Application.Services.Interfaces
{
    public interface IContaService
    {
        Task<List<ContaDTO>> GetContas();
        Task<ContaDTO> CreateContaAsync(CreateContaRequestDTO dto);
        Task<ContaDTO> GetContasById(Guid contaId);
    }
}
