using FinanceApp.Domain.Enums;
using TypeGen.Core.TypeAnnotations;

namespace FinanceApp.Application.DTOs.Receita
{
    [ExportTsInterface]
    public class CreateReceitaRequestDTO
    {
        public string Titulo { get; set; }
        public string? Descricao { get; set; }
        public decimal Valor { get; set; }
        public DateTime Data { get; set; }
        public DateTime? DataRecebimento { get; set; }
        public EnumCategoriaReceita Categoria { get; set; }
        public EnumStatusReceita Status { get; set; } = EnumStatusReceita.Pendente;
        public string? NumeroDocumento { get; set; }
        public Guid? ContaBancariaId { get; set; }
        public RecorrenciaConfigDTO? RecorrenciaConfig { get; set; }
    }

    [ExportTsInterface]
    public class RecorrenciaConfigDTO
    {
        public EnumRecorrencia TipoRecorrencia { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime? DataFim { get; set; }
        public int? DiaDoMes { get; set; }
        public DayOfWeek? DiaDaSemana { get; set; }
        public bool GerarOcorrenciaInicial { get; set; } = true;
    }
} 