
using FinanceApp.Domain.Entities.BaseEntities;
using FinanceApp.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace FinanceApp.Domain.Entities
{
    public class ReceitaRecorrencia : BaseEntity
    {
        [Required]
        public Guid UserId { get; set; }
        public User User { get; set; }

        [Required]
        public EnumRecorrencia TipoRecorrencia { get; set; }

        [Required]
        public DateTime DataInicio { get; set; }
        public DateTime? DataFim { get; set; }
        public int? DiaDoMes { get; set; } // Para recorrências mensais
        public DayOfWeek? DiaDaSemana { get; set; } // Para recorrências semanais

        [Required]
        public string Titulo { get; set; }
        public string? Descricao { get; set; }

        [Required]
        public decimal Valor { get; set; }

        [Required]
        public EnumCategoriaReceita Categoria { get; set; }
        public string? NumeroDocumento { get; set; }
        public Guid? ContaBancariaId { get; set; }

        // Para controle de geração
        public DateTime? UltimaGeracao { get; set; }
        public DateTime? ProximoVencimento { get; set; }

        [Required]
        public bool Ativa { get; set; } = true;

        public virtual ICollection<Receita> Ocorrencias { get; set; } = new List<Receita>();
    }
}
