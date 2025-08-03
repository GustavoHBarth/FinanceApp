using FinanceApp.Domain.Entities.BaseEntities;
namespace FinanceApp.Domain.Entities
{
    public class ResumoMensal : BaseEntity
    {
        public int Mes { get; set; }
        public int Ano { get; set; }

        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set; }
        public decimal SaldoFinal => TotalReceitas - TotalDespesas;
    }
}
