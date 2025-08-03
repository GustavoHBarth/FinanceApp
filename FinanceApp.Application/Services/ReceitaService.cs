using FinanceApp.Application.DTOs;
using FinanceApp.Application.Services.Interfaces;
using FinanceApp.Domain.Entities;
using FinanceApp.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using FinanceApp.Application.Mapper;

namespace FinanceApp.Application.Services
{
    public class ReceitaService : IReceitaService
    {
        public readonly IRepository<Receita> _receitaRepository;

        public ReceitaService(IRepository<Receita> receitaRepository)
        {
            _receitaRepository = receitaRepository;
        }

        public async Task<List<ReceitaDTO>> GetReceitas(Guid userId)
        {
            var receitas = await _receitaRepository
                .Where(r => r.UserId == userId)
                .Select(r => r.ToDTO())
                .ToListAsync();

            return receitas;
        }

        public async Task<ReceitaDTO> GetReceitaById(Guid receitaId, Guid userId)
        {
            var receita = await _receitaRepository
                .Where(r => r.Id == receitaId && r.UserId == userId)
                .FirstOrDefaultAsync()
                ?? throw new KeyNotFoundException("Receita não encontrada.");

            return receita.ToDTO();
        }

        public async Task<ReceitaDTO> CreateReceitaAsync(CreateReceitaRequestDTO dto, Guid userId)
        {
            var receita = new Receita
            {
                Id = Guid.NewGuid(),
                Titulo = dto.Titulo,
                Descricao = dto.Descricao,
                Valor = dto.Valor,
                Data = dto.Data,
                DataRecebimento = dto.DataRecebimento,
                Categoria = dto.Categoria,
                Status = dto.Status,
                Recorrencia = dto.Recorrencia,
                NumeroDocumento = dto.NumeroDocumento,
                ContaBancariaId = dto.ContaBancariaId,
                UserId = userId
            };

            await _receitaRepository.Add(receita);

            return receita.ToDTO();
        }

        public async Task<ReceitaDTO> UpdateReceitaAsync(Guid id, UpdateReceitaRequestDTO dto, Guid userId)
        {
            var receita = await _receitaRepository
                .Where(r => r.Id == id && r.UserId == userId)
                .FirstOrDefaultAsync()
                ?? throw new KeyNotFoundException("Receita não encontrada.");

            receita.Titulo = dto.Titulo;
            receita.Descricao = dto.Descricao;
            receita.Valor = dto.Valor;
            receita.Data = dto.Data;
            receita.DataRecebimento = dto.DataRecebimento;
            receita.Categoria = dto.Categoria;
            receita.Status = dto.Status;
            receita.Recorrencia = dto.Recorrencia;
            receita.NumeroDocumento = dto.NumeroDocumento;
            receita.ContaBancariaId = dto.ContaBancariaId;
            
            receita.Update();

            await _receitaRepository.Update(receita);

            return receita.ToDTO();
        }

        public async Task DeleteReceitaAsync(Guid id, Guid userId)
        {
            var receita = await _receitaRepository
                .Where(r => r.Id == id && r.UserId == userId)
                .FirstOrDefaultAsync()
                ?? throw new KeyNotFoundException("Receita não encontrada.");

            await _receitaRepository.Delete(receita);
        }
    }
} 