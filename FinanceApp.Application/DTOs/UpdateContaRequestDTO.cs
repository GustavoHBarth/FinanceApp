using FinanceApp.Domain.Enums;

namespace FinanceApp.Application.DTOs
{
    public class UpdateContaRequestDTO
    {
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
        
        // Propriedades de parcelamento simplificadas
        public bool EhParcelado { get; set; }
        public int? TotalParcelas { get; set; }
        public DateTime? DataPrimeiraParcela { get; set; }
    }
}