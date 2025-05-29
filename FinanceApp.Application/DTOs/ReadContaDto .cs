using FinanceApp.Domain.Enums;

namespace FinanceApp.Application.DTOs
{
    public class ReadContaDto
    {
        public Guid Id { get; set; }
        public string Descricao { get; set; }
        public decimal? Valor { get; set; }
        public CategoriaConta Categoria { get; set; }
        public DateTime Data { get; set; }
    }
}
