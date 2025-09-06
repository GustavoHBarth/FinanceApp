using FinanceApp.Domain.Enums;
using TypeGen.Core.TypeAnnotations;

namespace FinanceApp.Application.DTOs.Resumo
{
    [ExportTsInterface]
    public class ReceitasDashboardDTO
    {
        public decimal TotalMes { get; set; }
        public MaiorFonteDTO? MaiorFonte { get; set; }
        public decimal PrevisaoAnual { get; set; }
    }

    [ExportTsInterface]
    public class MaiorFonteDTO
    {
        public EnumCategoriaReceita Categoria { get; set; }
        public decimal Total { get; set; }
    }
}


