using FinanceApp.Models;
using System;

namespace FinanceApp.API.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }

        // Adicionando UserId (relacionamento com o usuário)
        public string UserId { get; set; }
        public User User { get; set; } // Relacionamento com o modelo User
    }
}
