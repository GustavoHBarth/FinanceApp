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
        public bool EhParcelado { get; set; } = false;
        public int? NumeroParcela { get; set; }
        
        [Range(2, 100, ErrorMessage = "Total de parcelas deve ser entre 2 e 100")]
        public int? TotalParcelas { get; set; }
        public string? NumeroDocumento { get; set; }
        public Guid? ContaBancariaId { get; set; }
    }
} 