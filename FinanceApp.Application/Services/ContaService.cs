using FinanceApp.Application.DTOs;
using FinanceApp.Application.Services.Interfaces;
using FinanceApp.Domain.Entities;
using FinanceApp.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using FinanceApp.Application.Mapper;

namespace FinanceApp.Application.Services
{
    public class ContaService : IContaService
    {
        public readonly IRepository<Conta> _contaRepository;
        public readonly IContaParcelamentoService _parcelamentoService;

        public ContaService(IRepository<Conta> contaRepository, IContaParcelamentoService parcelamentoService)
        {
            _contaRepository = contaRepository;
            _parcelamentoService = parcelamentoService;
        }

        public async Task<List<ContaDTO>> GetContas(Guid userId)
        {
            var contas = await _contaRepository
                .Where(c => c.UserId == userId)
                .Select(c => c.ToDTO())
                .ToListAsync();

            return contas;
        }

        public async Task<ContaDTO> GetContasById(Guid contaId, Guid userId)
        {
            var conta = await _contaRepository
                .Where(c => c.Id == contaId && c.UserId == userId)
                .FirstOrDefaultAsync()
                ?? throw new KeyNotFoundException("Conta não encontrada.");

            return conta.ToDTO();
        }

        public async Task<ContaDTO> CreateContaAsync(CreateContaRequestDTO dto, Guid userId)
        {
            var conta = new Conta
            {
                Id = Guid.NewGuid(),
                Titulo = dto.Titulo,
                Descricao = dto.Descricao,
                Valor = dto.Valor,
                Data = dto.Data,
                DataVencimento = dto.DataVencimento,
                Categoria = dto.Categoria,
                Status = dto.Status,
                Recorrencia = dto.Recorrencia,
                EhParcelado = dto.EhParcelado,
                NumeroParcela = dto.NumeroParcela,
                TotalParcelas = dto.TotalParcelas,
                NumeroDocumento = dto.NumeroDocumento,
                ContaBancariaId = dto.ContaBancariaId,
                UserId = userId
            };

            if (conta.EhParcelado && conta.TotalParcelas.HasValue && conta.TotalParcelas.Value > 1)
            {
                var parcelas = _parcelamentoService.GerarParcelas(conta);
                
                foreach (var parcela in parcelas)
                {
                    await _contaRepository.Add(parcela);
                }
                
                return parcelas.First().ToDTO();
            }
            else
            {
                await _contaRepository.Add(conta);
                return conta.ToDTO();
            }
        }

        public async Task<ContaDTO> UpdateContaAsync(Guid id, UpdateContaRequestDTO dto, Guid userId)
        {
            var conta = await _contaRepository
                .Where(c => c.Id == id)
                .FirstOrDefaultAsync()
                ?? throw new KeyNotFoundException("Conta não encontrada.");

            conta.Titulo = dto.Titulo;
            conta.Descricao = dto.Descricao;
            conta.Valor = dto.Valor;
            conta.Data = dto.Data;
            conta.DataVencimento = dto.DataVencimento;
            conta.Categoria = dto.Categoria;
            conta.Status = dto.Status;
            conta.Recorrencia = dto.Recorrencia;
            conta.EhParcelado = dto.EhParcelado;
            conta.NumeroParcela = dto.NumeroParcela;
            conta.TotalParcelas = dto.TotalParcelas;
            conta.NumeroDocumento = dto.NumeroDocumento;
            conta.ContaBancariaId = dto.ContaBancariaId;
            conta.UserId = userId;

            conta.Update();

            await _contaRepository.Update(conta);

            return conta.ToDTO();
        }

        public async Task DeleteContaAsync(Guid id, Guid userId)
        {
            var conta = await _contaRepository
                .Where(c => c.Id == id)
                .FirstOrDefaultAsync()
                ?? throw new KeyNotFoundException("Conta não encontrada.");

            await _contaRepository.Delete(conta);
        }
    }
}
