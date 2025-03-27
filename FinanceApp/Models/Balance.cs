using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using FinanceApp.Models;

namespace FinanceApp.Models
{
    public class Balance
    {
        public int Id { get; set; }
        public decimal Amount { get; set; } // O valor atual do saldo
    }

}
