using FinanceApp.Application.DTOs;
using FinanceApp.Application.Services.Interfaces;
using FinanceApp.Domain.Entites;
using FinanceApp.Domain.Interfaces;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FinanceApp.Application.Services
{
    public class ContasService : IContasService
    {
        private readonly IRepository<Contas> _repository;

        public ContasService(IRepository<Contas> repository)
        {
            _repository = repository;
        }


        public async Task<IEnumerable<ReadContaDto>> GetAllAsync()
        {
            var contas = _repository.GetAll();
            return contas.Select(c => new ReadContaDto
            {
                Id = c.Id,
                Valor = c.Valor ?? 0m,
                Descricao = c.Descricao ?? string.Empty,
                Categoria = c.Categoria,
                Data = c.Data
            });
        }

        public async Task<ReadContaDto> GetByIdAsync(Guid id)
        {
            var c = await _repository.GetById(id);
            if (c == null) return null;

            return new ReadContaDto
            {
                Id = c.Id,
                Valor = c.Valor ?? 0m,
                Descricao = c.Descricao ?? string.Empty,
                Categoria = c.Categoria,
                Data = c.Data
            };
        }

        public async Task<ReadContaDto> CreateAsync(CreateContaDto dto)
        {
            var conta = new Contas
            {
                Id = Guid.NewGuid(),
                Valor = dto.Valor,
                Descricao = dto.Descricao,
                Categoria = dto.Categoria,
                Data = dto.Data
            };
            await _repository.Add(conta);
            await _repository.Commit();

            return await GetByIdAsync(conta.Id);
        }

        public async Task UpdateAsync(UpdateContaDto dto)
        {
            var conta = await _repository.GetById(dto.Id);
            if (conta == null) return;

            conta.Valor = dto.Valor;
            conta.Descricao = dto.Descricao;
            conta.Categoria = dto.Categoria;
            conta.Data = dto.Data;

            await _repository.Update(conta);
            await _repository.Commit();
        }

        public async Task DeleteAsync(Guid id)
        {
            await _repository.DeleteById(id);
            await _repository.Commit();
        }
    }
}
