using FinanceApp.Domain.Enums;
using TypeGen.Core.TypeAnnotations;

namespace FinanceApp.Application.DTOs.Receita
{
    [ExportTsInterface]
    public class ReceitaDTO
    {
        public Guid Id { get; set; }
        public string Titulo { get; set; }
        public string? Descricao { get; set; }
        public decimal Valor { get; set; }
        public DateTime Data { get; set; }
        public DateTime? DataRecebimento { get; set; }
        public EnumCategoriaReceita Categoria { get; set; }
        public EnumStatusReceita Status { get; set; }
        public EnumRecorrencia? Recorrencia { get; set; }
        public string? NumeroDocumento { get; set; }
        public Guid? ContaBancariaId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
} 