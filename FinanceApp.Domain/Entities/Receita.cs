using FinanceApp.Domain.Entities.BaseEntities;
using FinanceApp.Domain.Enums;
using System.ComponentModel.DataAnnotations;


namespace FinanceApp.Domain.Entities
{
    public class Receita : BaseEntity
    {
        [Required]
        public string Titulo { get; set; }
        public string? Descricao { get; set; }
        public decimal Valor { get; set; }
        public DateTime Data { get; set; }
        public DateTime? DataRecebimento { get; set; }
        public EnumCategoriaReceita Categoria { get; set; }
        public EnumStatusReceita Status { get; set; } = EnumStatusReceita.Pendente;
        public string? NumeroDocumento { get; set; }
        public Guid? ContaBancariaId { get; set; }

        public string? Competencia { get; set; } // Formato "MM/yyyy"

        [Required]
        public Guid UserId { get; set; }
        public User User { get; set; }

        public Guid? RecorrenciaRegraId { get; set; }
        public ReceitaRecorrencia? RecorrenciaRegra { get; set; }
    }
}
