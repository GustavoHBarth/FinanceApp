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
        public readonly IRepository<Parcela> _parcelaRepository;

        public ContaService(IRepository<Conta> contaRepository, IRepository<Parcela> parcelaRepository)
        {
            _contaRepository = contaRepository;
            _parcelaRepository = parcelaRepository;
        }

        public async Task<List<ContaDTO>> GetContas(Guid userId, int? month = null, int? year = null)
        {
            var contas = await _contaRepository
                .Where(c => c.UserId == userId && !c.SysIsDeleted)
                .Include(c => c.Parcelas)
                .ToListAsync();

            return contas.Select(c => c.ToDTO()).ToList();
        }

        public async Task<ContaDTO> GetContasById(Guid contaId, Guid userId)
        {
            var conta = await _contaRepository
                .Where(c => c.Id == contaId && c.UserId == userId)
                .Include(c => c.Parcelas)
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
                NumeroDocumento = dto.NumeroDocumento,
                ContaBancariaId = dto.ContaBancariaId,
                UserId = userId
            };

            await _contaRepository.Add(conta);

         
            if (dto.EhParcelado && dto.TotalParcelas.HasValue && dto.TotalParcelas.Value > 1)
            {
                var parcelas = GerarParcelasAutomaticamente(conta, dto.TotalParcelas.Value, dto.DataPrimeiraParcela ?? dto.Data);
                
                foreach (var parcela in parcelas)
                {
                    await _parcelaRepository.Add(parcela);
                }
            }

            return conta.ToDTO();
        }

        public async Task<ContaDTO> UpdateContaAsync(Guid id, UpdateContaRequestDTO dto, Guid userId)
        {
            var conta = await _contaRepository
                .Where(c => c.Id == id && c.UserId == userId)
                .Include(c => c.Parcelas)
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
            conta.NumeroDocumento = dto.NumeroDocumento;
            conta.ContaBancariaId = dto.ContaBancariaId;
            conta.UserId = userId;

            conta.Update();

            await _contaRepository.Update(conta);

            return conta.ToDTO();
        }

        public async Task DeleteContaAsync(Guid id, Guid userId, bool deleteParcelas = false)
        {
            var conta = await _contaRepository
                .Where(c => c.Id == id && c.UserId == userId)
                .Include(c => c.Parcelas)
                .FirstOrDefaultAsync()
                ?? throw new KeyNotFoundException("Conta não encontrada.");


            if (deleteParcelas && conta.Parcelas != null && conta.Parcelas.Any())
            {
                foreach (var parcela in conta.Parcelas)
                {
                    parcela.Delete();
                    parcela.Update();
                    await _parcelaRepository.Update(parcela);
                }
            }

            conta.Delete(); 
            conta.Update(); 

            await _contaRepository.Update(conta); 
        }

  
        private List<Parcela> GerarParcelasAutomaticamente(Conta conta, int totalParcelas, DateTime dataPrimeiraParcela)
        {
            var parcelas = new List<Parcela>();
            var valorParcela = CalcularValorParcela(conta.Valor, totalParcelas);

            for (int i = 1; i <= totalParcelas; i++)
            {
                var dataVencimento = CalcularDataVencimento(dataPrimeiraParcela, i);
                
                var parcela = new Parcela
                {
                    Id = Guid.NewGuid(),
                    ContaId = conta.Id,
                    NumeroParcela = i,
                    TotalParcelas = totalParcelas,
                    ValorParcela = valorParcela,
                    DataVencimento = dataVencimento,
                    Observacao = $"Parcela {i}/{totalParcelas}",
                    UserId = conta.UserId
                };

                parcelas.Add(parcela);
            }

            return parcelas;
        }

 
        private decimal CalcularValorParcela(decimal valorTotal, int totalParcelas)
        {
            if (totalParcelas <= 0)
                throw new ArgumentException("Total de parcelas deve ser maior que zero");

            return Math.Round(valorTotal / totalParcelas, 2);
        }

        private DateTime CalcularDataVencimento(DateTime dataPrimeiraParcela, int numeroParcela)
        {
            return dataPrimeiraParcela.AddMonths(numeroParcela - 1);
        }
    }
}
