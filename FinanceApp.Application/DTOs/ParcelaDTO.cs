using FinanceApp.Domain.Enums;
using TypeGen.Core.TypeAnnotations;

namespace FinanceApp.Application.DTOs
{
    [ExportTsInterface]
    public class ParcelaDTO
    {
        public Guid Id { get; set; }
        public Guid ContaId { get; set; }
        public int NumeroParcela { get; set; }
        public int TotalParcelas { get; set; }
        public decimal ValorParcela { get; set; }
        public DateTime DataVencimento { get; set; }
        public string? Observacao { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}