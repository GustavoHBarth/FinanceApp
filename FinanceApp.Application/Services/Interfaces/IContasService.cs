using FinanceApp.Application.DTOs;

namespace FinanceApp.Application.Services.Interfaces
{
    public interface IContasService
    {
        Task<IEnumerable<ReadContaDto>> GetAllAsync();
        Task<ReadContaDto> GetByIdAsync(Guid id);
        Task<ReadContaDto> CreateAsync(CreateContaDto dto);
        Task UpdateAsync(UpdateContaDto dto);
        Task DeleteAsync(Guid id);
    }
}
