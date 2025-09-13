using FinanceApp.Application.Services.Interfaces;
using FinanceApp.Domain.Entities;
using FinanceApp.Domain.Enums;
using FinanceApp.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FinanceApp.Application.Services
{
    public class RecorrenciaService : IRecorrenciaService
    {
        private readonly IRepository<ReceitaRecorrencia> _regraRepo;
        private readonly IRepository<Receita> _receitaRepo;

        public RecorrenciaService(IRepository<ReceitaRecorrencia> regraRepo, IRepository<Receita> receitaRepo)
        {
            _regraRepo = regraRepo;
            _receitaRepo = receitaRepo;
        }

        public async Task<int> GerarPendentes(Guid userId, DateTime ateDataUtc, CancellationToken ct = default)
        {
            var hojeUtc = DateTime.UtcNow.Date;
            var regras = _regraRepo.Where(r => r.UserId == userId && r.Ativa && (r.DataFim == null || r.DataFim >= hojeUtc));
            var totalCriadas = 0;

            foreach(var regra in regras)
            {
                // Limite superior: hoje/ateDataUtc respeitando DataFim da regra
                var fim = ateDataUtc.Date;
                if (regra.DataFim.HasValue && regra.DataFim.Value.Date < fim)
                    fim = regra.DataFim.Value.Date;

                // Descobrir a última ocorrência já GERADA desta regra
                var ultimo = await _receitaRepo.Where(r =>
                        r.UserId == userId &&
                        r.RecorrenciaRegraId == regra.Id)
                    .OrderByDescending(r => r.Data)
                    .Select(r => (DateTime?)r.Data)
                    .FirstOrDefaultAsync(ct);

                // Ponto de partida: próxima ocorrência após a última gerada; se não existe, começar da DataInicio
                var inicio = ultimo.HasValue
                    ? (CalcularProximoApos(ultimo.Value, regra) ?? ultimo.Value.Date)
                    : regra.DataInicio.Date;

                if (fim < inicio)
                    continue;

                var ocorrencias = EnumerarDatasOcorrencias(regra, inicio, fim);

                DateTime? ultimaGeradaNoLoop = null;

                foreach (var dataOcorrencia in ocorrencias)
                {
                    var competencia = $"{dataOcorrencia:MM/yyyy}";

                    var existe = await _receitaRepo.Exists(r =>
                        r.UserId == userId &&
                        r.RecorrenciaRegraId == regra.Id &&
                        r.Competencia == competencia);

                    if (existe)
                        continue;

                    var receita = new Receita
                    {
                        Id = Guid.NewGuid(),
                        Titulo = regra.Titulo,
                        Descricao = regra.Descricao,
                        Valor = regra.Valor,
                        Data = dataOcorrencia,
                        DataRecebimento = null,
                        Categoria = regra.Categoria,
                        Status = EnumStatusReceita.Pendente,
                        NumeroDocumento = regra.NumeroDocumento,
                        ContaBancariaId = regra.ContaBancariaId,
                        UserId = userId,
                        Competencia = competencia,
                        RecorrenciaRegraId = regra.Id
                    };

                    await _receitaRepo.Add(receita);
                    ultimaGeradaNoLoop = dataOcorrencia;
                    totalCriadas++;
                }

                // Marcadores da regra
                regra.UltimaGeracao = DateTime.UtcNow;

                DateTime? baseProximo = ultimaGeradaNoLoop ?? ultimo;
                regra.ProximoVencimento = baseProximo.HasValue
                    ? CalcularProximoApos(baseProximo.Value, regra)
                    : CalcularProximoApos(inicio, regra);

                await _regraRepo.Update(regra);
            }
            return totalCriadas;
        }

        private static IEnumerable<DateTime> EnumerarDatasOcorrencias(ReceitaRecorrencia regra, DateTime inicio, DateTime fim)
        {
            switch (regra.TipoRecorrencia)
            {
                case EnumRecorrencia.Semanal:
                    return EnumerarSemanal(regra, inicio, fim);
                case EnumRecorrencia.Mensal:
                    return EnumerarMensal(regra, inicio, fim);
                case EnumRecorrencia.Anual:
                    return EnumerarAnual(regra, inicio, fim);
                default:
                    return Enumerable.Empty<DateTime>();
            }
        }

        private static IEnumerable<DateTime> EnumerarSemanal(ReceitaRecorrencia regra, DateTime inicio, DateTime fim)
        {
            var target = regra.DiaDaSemana ?? inicio.DayOfWeek;
            var seed = inicio;
            var diff = ((int)target - (int)seed.DayOfWeek + 7) % 7;
            var first = seed.AddDays(diff);

            for (var d = first; d <= fim; d = d.AddDays(7))
            {
                yield return d;
            }
        }

        private static IEnumerable<DateTime> EnumerarMensal(ReceitaRecorrencia regra, DateTime inicio, DateTime fim)
        {
            var dia = regra.DiaDoMes ?? regra.DataInicio.Day;
            var cursor = new DateTime(inicio.Year, inicio.Month, 1);

            while (cursor <= fim)
            {
                var lastDay = DateTime.DaysInMonth(cursor.Year, cursor.Month);
                var day = Math.Min(dia, lastDay);
                var data = new DateTime(cursor.Year, cursor.Month, day);

                if (data >= inicio && data <= fim)
                {
                    yield return data;
                }

                cursor = cursor.AddMonths(1);
            }
        }

        private static IEnumerable<DateTime> EnumerarAnual(ReceitaRecorrencia regra, DateTime inicio, DateTime fim)
        {
            var cursor = new DateTime(inicio.Year, regra.DataInicio.Month, regra.DataInicio.Day);
            if(cursor < inicio)
            {
                cursor = cursor.AddYears(1);
            }

            while (cursor <= fim)
            {
                yield return cursor;
                cursor = cursor.AddYears(1);
            }
        }

        private static DateTime? CalcularProximoApos(DateTime baseDate, ReceitaRecorrencia regra)
        {
            return regra.TipoRecorrencia switch
            {
                EnumRecorrencia.Semanal => ProximoSemanal(baseDate, regra.DiaDaSemana ?? baseDate.DayOfWeek),
                EnumRecorrencia.Mensal => ProximoMensal(baseDate, regra.DiaDoMes ?? regra.DataInicio.Day),
                EnumRecorrencia.Anual => new DateTime(baseDate.Year + 1, regra.DataInicio.Month, regra.DataInicio.Day),
                _ => null
            };
        }

        private static DateTime? ProximoSemanal(DateTime baseDate, DayOfWeek target)
        {
            var seed = baseDate.Date;
            var diff = ((int)target - (int)seed.DayOfWeek + 7) % 7;
            return seed.AddDays(diff == 0 ? 7 : diff);
        }

        private static DateTime ProximoMensal(DateTime baseDate, int dia)
        {
            var next = baseDate.AddMonths(1);
            var last = DateTime.DaysInMonth(next.Year, next.Month);
            var d = Math.Min(dia, last);
            return new DateTime(next.Year, next.Month, d);
        }
    }
}
