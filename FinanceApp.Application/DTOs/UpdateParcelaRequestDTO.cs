using FinanceApp.Domain.Enums;
using TypeGen.Core.TypeAnnotations;

namespace FinanceApp.Application.DTOs
{
    [ExportTsInterface]
    public class UpdateParcelaRequestDTO
    {
        public decimal? ValorParcela { get; set; }
        public DateTime? DataVencimento { get; set; }
        public string? Observacao { get; set; }
    }
}