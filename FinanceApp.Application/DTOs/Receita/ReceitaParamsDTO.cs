using FinanceApp.Domain.Enums;

namespace FinanceApp.Application.DTOs.Receita
{
    public class ReceitaParamsDTO
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public EnumCategoriaReceita? Categoria { get; set; }
        public EnumStatusReceita? Status { get; set; } // ajuste aqui
        public string? Sort { get; set; } = "data_desc"; // novo: data_desc, data_asc, valor_desc, valor_asc, created_desc, created_asc
    }
}
