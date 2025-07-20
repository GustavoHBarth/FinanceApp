namespace FinanceApp.Application.DTOs
{
    public class CreateContaRequestDTO
    {
        public string Title { get; set; }
        public string? Descricao { get; set; }
        public decimal Valor { get; set; }
        public DateTime Data { get; set; }
        public int Categoria { get; set; }
    }
} 