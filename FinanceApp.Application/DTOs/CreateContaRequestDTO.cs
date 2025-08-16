using FinanceApp.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace FinanceApp.Application.DTOs
{
    public class CreateContaRequestDTO
    {
        public string Titulo { get; set; }
        public string? Descricao { get; set; }
        public decimal Valor { get; set; }
        public DateTime Data { get; set; }
        public DateTime? DataVencimento { get; set; }
        public EnumCategoriaConta Categoria { get; set; }
        public EnumStatusConta Status { get; set; } = EnumStatusConta.Pendente;
        public EnumRecorrencia? Recorrencia { get; set; }
        public string? NumeroDocumento { get; set; }
        public Guid? ContaBancariaId { get; set; }
        
        // Propriedades de parcelamento simplificadas
        public bool EhParcelado { get; set; } = false;
        
        // TotalParcelas só é obrigatório quando EhParcelado = true
        public int? TotalParcelas { get; set; }
        
        public DateTime? DataPrimeiraParcela { get; set; }
    }
} 