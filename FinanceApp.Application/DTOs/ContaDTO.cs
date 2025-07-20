using FinanceApp.Domain.Enums;

namespace FinanceApp.Application.DTOs
{
    public class ContaDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string? Descricao { get; set; }
        public decimal Valor { get; set; }
        public DateTime Data { get; set; }
        public EnumCategoriaConta Categoria { get; set; } // EnumCategoriaConta como int
    }
}
