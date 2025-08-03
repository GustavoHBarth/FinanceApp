using FinanceApp.Domain.Enums;

namespace FinanceApp.Application.DTOs
{
    public class CreateReceitaRequestDTO
    {
        public string Titulo { get; set; }
        public string? Descricao { get; set; }
        public decimal Valor { get; set; }
        public DateTime Data { get; set; }
        public DateTime? DataRecebimento { get; set; }
        public EnumCategoriaReceita Categoria { get; set; }
        public EnumStatusReceita Status { get; set; } = EnumStatusReceita.Pendente;
        public EnumRecorrencia? Recorrencia { get; set; }
        public string? NumeroDocumento { get; set; }
        public Guid? ContaBancariaId { get; set; }
    }
} 