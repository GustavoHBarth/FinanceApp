using FinanceApp.Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace FinanceApp.API.Models
{
    public class Transaction
    {
        public int Id { get; set; }

        [Required]
        public decimal Amount { get; set; }

       
        public string Category { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime Date { get; set; }


        // Adicionando UserId (relacionamento com o usuário)
        [Required]
        public string? UserId { get; set; }
        public User? User { get; set; } // Relacionamento com o modelo User
    }
}
