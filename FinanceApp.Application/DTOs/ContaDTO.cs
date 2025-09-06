using FinanceApp.Domain.Enums;
using TypeGen.Core.TypeAnnotations;

namespace FinanceApp.Application.DTOs
{
    [ExportTsInterface]
    public class ContaDTO
    {
        public Guid Id { get; set; }
        public string Titulo { get; set; }
        public string? Descricao { get; set; }
        public decimal Valor { get; set; }
        public DateTime Data { get; set; }
        public DateTime? DataVencimento { get; set; }
        public EnumCategoriaConta Categoria { get; set; }
        public EnumStatusConta Status { get; set; }
        public EnumRecorrencia? Recorrencia { get; set; }
        public string? NumeroDocumento { get; set; }
        public Guid? ContaBancariaId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        
        public bool EhParcelado { get; set; }
        public int? TotalParcelas { get; set; }
        public DateTime? DataPrimeiraParcela { get; set; }
        public List<ParcelaDTO> Parcelas { get; set; } = new List<ParcelaDTO>();
    }
}
