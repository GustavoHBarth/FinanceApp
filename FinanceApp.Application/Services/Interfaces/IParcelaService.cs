using FinanceApp.Application.DTOs;

namespace FinanceApp.Application.Services.Interfaces
{
    public interface IParcelaService
    {
        Task<List<ParcelaDTO>> GetParcelasByContaId(Guid contaId, Guid userId);
        Task<ParcelaDTO> GetParcelaById(Guid parcelaId, Guid userId);
        Task<ParcelaDTO> CreateParcelaAsync(CreateParcelaRequestDTO dto, Guid userId);
        Task<ParcelaDTO> UpdateParcelaAsync(Guid id, UpdateParcelaRequestDTO dto, Guid userId);
        Task DeleteParcelaAsync(Guid id, Guid userId);
        Task<List<ParcelaDTO>> GetParcelasVencidas(Guid userId);
    }
}