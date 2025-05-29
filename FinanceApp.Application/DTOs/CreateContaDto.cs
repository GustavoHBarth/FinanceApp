using FinanceApp.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace FinanceApp.Application.DTOs
{
    public class CreateContaDto
    {
        [Required(ErrorMessage = "A descrição é obrigatória.")]
        public string Descricao { get; set; }

        [Required(ErrorMessage = "O valor é obrigatório.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "O valor deve ser maior que zero.")]
        public decimal? Valor { get; set; }

        [Required(ErrorMessage = "A categoria é obrigatória.")]
        public CategoriaConta Categoria { get; set; }

        [Required(ErrorMessage = "A data é obrigatória.")]
        public DateTime Data { get; set; }
    }
}
