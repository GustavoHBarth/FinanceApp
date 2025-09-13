using FinanceApp.Domain.Entities.BaseEntities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FinanceApp.Domain.Entities
{
    [Table("Users")]
    [Index(nameof(Email), IsUnique = true)]
    public class User : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public string Email { get; set; } = string.Empty;

        public string? PasswordHash { get; set; }

        public virtual ICollection<Conta> Contas { get; set; } = new List<Conta>();
        public virtual ICollection<Receita> Receitas { get; set; } = new List<Receita>();
        public virtual ICollection<Parcela> Parcelas { get; set; } = new List<Parcela>();
        public virtual ICollection<ReceitaRecorrencia> ReceitaRecorrencias { get; set; } = new List<ReceitaRecorrencia>();
    }
}