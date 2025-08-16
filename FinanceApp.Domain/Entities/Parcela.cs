using System.ComponentModel.DataAnnotations;
using FinanceApp.Domain.Entities.BaseEntities;

namespace FinanceApp.Domain.Entities
{
    public class Parcela : BaseEntity
    {
        public Guid ContaId { get; set; }
        public virtual Conta Conta { get; set; }

        [Required]
        public int NumeroParcela { get; set; }
        [Required]
        public int TotalParcelas { get; set; }
        [Required]
        public decimal ValorParcela { get; set; }
        [Required]
        public DateTime DataVencimento { get; set; }

        public string? Observacao { get; set; }

        [Required]
        public Guid UserId { get; set; }
        public virtual User User { get; set; }
    }
}
