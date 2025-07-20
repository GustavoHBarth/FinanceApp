using FinanceApp.Domain.Entities.BaseEntities;
using FinanceApp.Domain.Enums;

namespace FinanceApp.Domain.Entities
{
    public class Conta : BaseEntity
    {
        public string Title { get; set; }
        public string? Descricao { get; set; }
        public decimal Valor { get; set; }
        public DateTime Data { get; set; }
        public EnumCategoriaConta Categoria { get; set; }
    }
}
