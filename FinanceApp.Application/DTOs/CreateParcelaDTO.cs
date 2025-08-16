using System.ComponentModel.DataAnnotations;

namespace FinanceApp.Application.DTOs
{
    public class CreateParcelaRequestDTO
    {
        [Required]
        public Guid ContaId { get; set; }

        [Required]
        [Range(1, 100, ErrorMessage = "Número da parcela deve ser entre 1 e 100")]
        public int NumeroParcela { get; set; }

        [Required]
        [Range(2, 100, ErrorMessage = "Total de parcelas deve ser entre 2 e 100")]
        public int TotalParcelas { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Valor da parcela deve ser maior que zero")]
        public decimal ValorParcela { get; set; }

        [Required]
        public DateTime DataVencimento { get; set; }

        public string? Observacao { get; set; }
    }
}