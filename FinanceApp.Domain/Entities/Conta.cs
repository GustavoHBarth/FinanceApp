using FinanceApp.Domain.Entities.BaseEntities;
using FinanceApp.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace FinanceApp.Domain.Entities
{
    public class Conta : BaseEntity
    {
        [Required]
        public string Titulo { get; set; }
        public string? Descricao { get; set; }
        public decimal Valor { get; set; }
        public DateTime Data { get; set; }
        public DateTime? DataVencimento { get; set; }
        public EnumCategoriaConta Categoria { get; set; }
        public EnumStatusConta Status { get; set; } = EnumStatusConta.Pendente;
        public EnumRecorrencia? Recorrencia { get; set; }
        public string? NumeroDocumento { get; set; }
        public Guid? ContaBancariaId { get; set; }

        [Required]
        public Guid UserId { get; set; }
        public virtual User User { get; set; }
        
        public virtual ICollection<Parcela> Parcelas { get; set; } = new List<Parcela>();
        
        public bool EhParcelado => Parcelas?.Any() == true;
    }
}
