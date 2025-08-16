using FinanceApp.Domain.Enums;

namespace FinanceApp.Application.DTOs
{
    public class UpdateParcelaRequestDTO
    {
        public decimal? ValorParcela { get; set; }
        public DateTime? DataVencimento { get; set; }
        public string? Observacao { get; set; }
    }
}