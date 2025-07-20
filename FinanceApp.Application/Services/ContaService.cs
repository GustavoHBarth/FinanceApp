using FinanceApp.Application.DTOs;
using FinanceApp.Application.Services.Interfaces;
using FinanceApp.Domain.Entities;
using FinanceApp.Domain.Enums;
using FinanceApp.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FinanceApp.Application.Services
{
    public class ContaService : IContaService
    {
        public readonly IRepository<Conta> _contaRepository;

        public ContaService(IRepository<Conta> contaRepository)
        {
            _contaRepository = contaRepository;
        }

        public async Task<List<ContaDTO>> GetContas()
        {
            var contas = await _contaRepository
                .GetAll()
                .Select(c => new ContaDTO
                {
                    Id = c.Id,
                    Title = c.Title,
                    Descricao = c.Descricao,
                    Valor = c.Valor,
                    Data = c.Data,
                    Categoria = (EnumCategoriaConta)c.Categoria
                })
                .ToListAsync();

            return contas;
        }

        public async Task<ContaDTO> GetContasById(Guid contaId)
        {
            var contas = await _contaRepository
                .Where(c => c.Id == contaId)
                .FirstOrDefaultAsync();

            return contas == null ? null : new ContaDTO
            {
                Id = contas.Id,
                Title = contas.Title,
                Descricao = contas.Descricao,
                Valor = contas.Valor,
                Data = contas.Data,
                Categoria = (EnumCategoriaConta)contas.Categoria
            };
        }

        public async Task<ContaDTO> CreateContaAsync(CreateContaRequestDTO dto)
        {
            var conta = new Conta
            {
                Id = Guid.NewGuid(),
                Title = dto.Title,
                Descricao = dto.Descricao,
                Valor = dto.Valor,
                Data = dto.Data,
                Categoria = (EnumCategoriaConta)dto.Categoria
            };

            await _contaRepository.Add(conta);

            return new ContaDTO
            {
                Id = conta.Id,
                Title = conta.Title,
                Descricao = conta.Descricao,
                Valor = conta.Valor,
                Data = conta.Data,
                Categoria = (EnumCategoriaConta)conta.Categoria
            };
        }
    }
}
