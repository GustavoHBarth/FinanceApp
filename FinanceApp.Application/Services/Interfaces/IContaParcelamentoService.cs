using FinanceApp.Domain.Entities;

namespace FinanceApp.Application.Services
{
    public interface IContaParcelamentoService
    {
        /// <summary>
        /// Gera todas as parcelas de uma conta parcelada
        /// </summary>
        /// <param name="contaOriginal">Conta original com informações de parcelamento</param>
        /// <returns>Lista de todas as parcelas geradas</returns>
        List<Conta> GerarParcelas(Conta contaOriginal);
        
        /// <summary>
        /// Calcula o valor de cada parcela
        /// </summary>
        /// <param name="valorTotal">Valor total da compra</param>
        /// <param name="totalParcelas">Número total de parcelas</param>
        /// <returns>Valor de cada parcela</returns>
        decimal CalcularValorParcela(decimal valorTotal, int totalParcelas);
        
        /// <summary>
        /// Calcula a data de vencimento de cada parcela
        /// </summary>
        /// <param name="dataPrimeiraParcela">Data da primeira parcela</param>
        /// <param name="numeroParcela">Número da parcela atual</param>
        /// <returns>Data de vencimento da parcela</returns>
        DateTime CalcularDataVencimento(DateTime dataPrimeiraParcela, int numeroParcela);
    }
} 