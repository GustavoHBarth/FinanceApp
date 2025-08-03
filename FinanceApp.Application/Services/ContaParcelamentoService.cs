using FinanceApp.Application.Services;
using FinanceApp.Domain.Entities;

namespace FinanceApp.Application.Services
{
    public class ContaParcelamentoService : IContaParcelamentoService
    {
        public List<Conta> GerarParcelas(Conta contaOriginal)
        {
            if (!contaOriginal.EhParcelado || !contaOriginal.TotalParcelas.HasValue)
                return new List<Conta> { contaOriginal };

            var parcelas = new List<Conta>();
            var valorParcela = CalcularValorParcela(contaOriginal.Valor, contaOriginal.TotalParcelas.Value);

            for (int i = 1; i <= contaOriginal.TotalParcelas.Value; i++)
            {
                var parcela = new Conta
                {
                    Id = Guid.NewGuid(),
                    Titulo = $"{contaOriginal.Titulo} - Parcela {i}/{contaOriginal.TotalParcelas}",
                    Descricao = contaOriginal.Descricao,
                    Valor = valorParcela,
                    Data = CalcularDataVencimento(contaOriginal.Data, i),
                    DataVencimento = CalcularDataVencimento(contaOriginal.Data, i),
                    Categoria = contaOriginal.Categoria,
                    Status = contaOriginal.Status,
                    Recorrencia = contaOriginal.Recorrencia,
                    EhParcelado = true,
                    NumeroParcela = i,
                    TotalParcelas = contaOriginal.TotalParcelas,
                    NumeroDocumento = contaOriginal.NumeroDocumento,
                    ContaBancariaId = contaOriginal.ContaBancariaId,
                    UserId = contaOriginal.UserId,
                    CreatedAt = DateTime.UtcNow
                };

                parcelas.Add(parcela);
            }

            return parcelas;
        }

        public decimal CalcularValorParcela(decimal valorTotal, int totalParcelas)
        {
            if (totalParcelas <= 0)
                throw new ArgumentException("Total de parcelas deve ser maior que zero");

            // Para simplicidade, dividindo igualmente
            // Em um sistema real, aqui entraria cálculo de juros
            return Math.Round(valorTotal / totalParcelas, 2);
        }

        public DateTime CalcularDataVencimento(DateTime dataPrimeiraParcela, int numeroParcela)
        {
            // Assumindo parcelas mensais
            // Em um sistema real, poderia ser configurável (quinzenal, bimestral, etc.)
            return dataPrimeiraParcela.AddMonths(numeroParcela - 1);
        }
    }
} 