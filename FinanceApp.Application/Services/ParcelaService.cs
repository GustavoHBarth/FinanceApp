using FinanceApp.Application.DTOs;
using FinanceApp.Application.Services.Interfaces;
using FinanceApp.Domain.Entities;
using FinanceApp.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using FinanceApp.Application.Mapper;

namespace FinanceApp.Application.Services
{
    public class ParcelaService : IParcelaService
    {
        private readonly IRepository<Parcela> _parcelaRepository;
        private readonly IRepository<Conta> _contaRepository;

        public ParcelaService(IRepository<Parcela> parcelaRepository, IRepository<Conta> contaRepository)
        {
            _parcelaRepository = parcelaRepository;
            _contaRepository = contaRepository;
        }

        public async Task<List<ParcelaDTO>> GetParcelasByContaId(Guid contaId, Guid userId)
        {
            var parcelas = await _parcelaRepository
                .Where(p => p.ContaId == contaId && p.UserId == userId && !p.SysIsDeleted)
                .OrderBy(p => p.NumeroParcela)
                .Select(p => p.ToDTO())
                .ToListAsync();

            return parcelas;
        }

        public async Task<ParcelaDTO> GetParcelaById(Guid parcelaId, Guid userId)
        {
            var parcela = await _parcelaRepository
                .Where(p => p.Id == parcelaId && p.UserId == userId && !p.SysIsDeleted)
                .FirstOrDefaultAsync()
                ?? throw new KeyNotFoundException("Parcela não encontrada.");

            return parcela.ToDTO();
        }

        public async Task<ParcelaDTO> CreateParcelaAsync(CreateParcelaRequestDTO dto, Guid userId)
        {
            // Verificar se a conta existe e pertence ao usuário
            var conta = await _contaRepository
                .Where(c => c.Id == dto.ContaId && c.UserId == userId && !c.SysIsDeleted)
                .FirstOrDefaultAsync()
                ?? throw new KeyNotFoundException("Conta não encontrada.");

            var parcela = new Parcela
            {
                Id = Guid.NewGuid(),
                ContaId = dto.ContaId,
                NumeroParcela = dto.NumeroParcela,
                TotalParcelas = dto.TotalParcelas,
                ValorParcela = dto.ValorParcela,
                DataVencimento = dto.DataVencimento,
                Observacao = dto.Observacao,
                UserId = userId
            };

            await _parcelaRepository.Add(parcela);
            return parcela.ToDTO();
        }

        public async Task<ParcelaDTO> UpdateParcelaAsync(Guid id, UpdateParcelaRequestDTO dto, Guid userId)
        {
            var parcela = await _parcelaRepository
                .Where(p => p.Id == id && p.UserId == userId && !p.SysIsDeleted)
                .FirstOrDefaultAsync()
                ?? throw new KeyNotFoundException("Parcela não encontrada.");

            if (dto.ValorParcela.HasValue)
                parcela.ValorParcela = dto.ValorParcela.Value;

            if (dto.DataVencimento.HasValue)
                parcela.DataVencimento = dto.DataVencimento.Value;

            if (dto.Observacao != null)
                parcela.Observacao = dto.Observacao;

            parcela.Update();
            await _parcelaRepository.Update(parcela);

            return parcela.ToDTO();
        }

        public async Task DeleteParcelaAsync(Guid id, Guid userId)
        {
            var parcela = await _parcelaRepository
                .Where(p => p.Id == id && p.UserId == userId && !p.SysIsDeleted)
                .FirstOrDefaultAsync()
                ?? throw new KeyNotFoundException("Parcela não encontrada.");

            parcela.Delete();
            parcela.Update();
            await _parcelaRepository.Update(parcela);
        }

        public async Task<List<ParcelaDTO>> GetParcelasVencidas(Guid userId)
        {
            var hoje = DateTime.Today;

            var parcelas = await _parcelaRepository
                .Where(p => p.UserId == userId &&
                           !p.SysIsDeleted &&
                           p.DataVencimento < hoje)
                .OrderBy(p => p.DataVencimento)
                .Select(p => p.ToDTO())
                .ToListAsync();

            return parcelas;
        }
    }
}