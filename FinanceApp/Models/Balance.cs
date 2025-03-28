using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using FinanceApp.Models;

namespace FinanceApp.Models
{
    public class Balance
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public string BalanceUserId { get; set; } // Alterar para string

        [ForeignKey("BalanceUserId")]
        public User User { get; set; } // Relacionamento com User
    }

}
