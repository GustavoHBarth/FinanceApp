using FinanceApp.Domain.Entities;
using FinanceApp.Domain.Enums;

namespace FinanceApp.Domain.Entites
{
    public class Contas : Entity
    {
        public Contas()
        {
            Data = DateTime.UtcNow;
        }
        public string Descricao { get; set; } = null;
        public decimal? Valor { get; set; }
        public CategoriaConta Categoria { get; set; }
        public DateTime Data { get; set; }
    }
}
