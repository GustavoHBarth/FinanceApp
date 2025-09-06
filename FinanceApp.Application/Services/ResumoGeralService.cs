using FinanceApp.Application.DTOs.Resumo;
using FinanceApp.Application.Services.Interfaces;
using FinanceApp.Domain.Entities;
using FinanceApp.Domain.Enums;
using FinanceApp.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FinanceApp.Application.Services
{
    public class ResumoGeralService : IResumoGeralService
    {
        private readonly IRepository<Receita> _receitaRepository;

        public ResumoGeralService(IRepository<Receita> receitaRepository)
        {
            _receitaRepository = receitaRepository;
        }

        public async Task<ReceitasDashboardDTO> GetReceitasDashboardAsync(Guid userId, int month, int year, EnumStatusReceita? status = null, CancellationToken ct = default)
        {
            month = Math.Min(12, Math.Max(1, month));

            var start = new DateTime(year, month, 1);
            var end = start.AddMonths(1);

            var baseQuery = _receitaRepository
                .Where(r => r.UserId == userId)
                .Where(r => r.Data >= start && r.Data < end);

            baseQuery = status.HasValue
                ? baseQuery.Where(r => r.Status == status.Value)
                : baseQuery.Where(r => r.Status != EnumStatusReceita.Cancelado);

            var totalMes = await baseQuery.AsNoTracking()
                .SumAsync(r => (decimal?)r.Valor, ct) ?? 0m;

            var maiorFonte = await baseQuery.AsNoTracking()
                .GroupBy(r => r.Categoria)
                .Select(g => new { Categoria = g.Key, Total = g.Sum(x => x.Valor) })
                .OrderByDescending(x => x.Total)
                .FirstOrDefaultAsync(ct);

            var ytdStart = new DateTime(year, 1, 1);
            var ytdEnd = new DateTime(year + 1, 1, 1);

            var ytdQuery = _receitaRepository
                .Where(r => r.UserId == userId)
                .Where(r => r.Data >= ytdStart && r.Data < ytdEnd);

            ytdQuery = status.HasValue
                ? ytdQuery.Where(r => r.Status == status.Value)
                : ytdQuery.Where(r => r.Status != EnumStatusReceita.Cancelado);

            var totalYtd = await ytdQuery.AsNoTracking()
                .SumAsync(r => (decimal?)r.Valor, ct) ?? 0m;

            var mesesDecorridos = Math.Max(1, month);
            var previsaoAnual = (totalYtd / mesesDecorridos) * 12m;

            return new ReceitasDashboardDTO
            {
                TotalMes = totalMes,
                MaiorFonte = maiorFonte is null ? null : new MaiorFonteDTO
                {
                    Categoria = maiorFonte.Categoria,
                    Total = maiorFonte.Total
                },
                PrevisaoAnual = previsaoAnual
            };
        }
    }
}
