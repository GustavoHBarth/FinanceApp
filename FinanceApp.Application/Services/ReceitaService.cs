using FinanceApp.Application.Services.Interfaces;
using FinanceApp.Domain.Entities;
using FinanceApp.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using FinanceApp.Application.Mapper;
using FinanceApp.Application.Exceptions;
using FinanceApp.Application.DTOs.Receita;
using FinanceApp.Application.Responses;
using FinanceApp.Domain.Enums;

namespace FinanceApp.Application.Services
{
    public class ReceitaService : IReceitaService
    {
        public readonly IRepository<Receita> _receitaRepository;
        private readonly IRepository<ReceitaRecorrencia> _recorrenciaRepository;

        public ReceitaService(IRepository<Receita> receitaRepository, IRepository<ReceitaRecorrencia> recorrenciaRepository)
        {
            _receitaRepository = receitaRepository;
            _recorrenciaRepository = recorrenciaRepository;
        }

        public async Task<PagedResultDTO<ReceitaDTO>> GetReceitas(Guid userId, ReceitaParamsDTO query, CancellationToken ct = default)
        {
            var page = query.Page < 1 ? 1 : query.Page;
            var size = query.PageSize <= 0 ? 20 : Math.Min(query.PageSize, 100);

            var q = _receitaRepository.Where(r => r.UserId == userId);

            if (query.DateFrom.HasValue) q = q.Where(r => r.Data >= query.DateFrom.Value);
            if (query.DateTo.HasValue) q = q.Where(r => r.Data <= query.DateTo.Value);
            if (query.Categoria.HasValue) q = q.Where(r => r.Categoria == query.Categoria.Value);
            if (query.Status.HasValue) q = q.Where(r => r.Status == query.Status.Value);

            var sort = (query.Sort ?? "data_desc").ToLowerInvariant();
            q = sort switch
            {
                "data_asc" => q.OrderBy(r => r.Data),
                "valor_asc" => q.OrderBy(r => r.Valor).ThenByDescending(r => r.Data),
                "valor_desc" => q.OrderByDescending(r => r.Valor).ThenByDescending(r => r.Data),
                "created_asc" => q.OrderBy(r => r.CreatedAt),
                "created_desc" => q.OrderByDescending(r => r.CreatedAt),
                _ => q.OrderByDescending(r => r.Data)
            };

            var total = await q.CountAsync(ct);

            var items = await q.AsNoTracking()
                .Skip((page - 1) * size)
                .Take(size)
                .Select(ReceitaMapper.ToDtoProjection)
                .ToListAsync(ct);

            return new PagedResultDTO<ReceitaDTO> { Items = items, Page = page, PageSize = size, Total = total };
        }

        public async Task<ReceitaDTO> GetReceitaById(Guid receitaId, Guid userId)
        {
            var receita = await _receitaRepository
                .Where(r => r.Id == receitaId && r.UserId == userId)
                .AsNoTracking()
                .Select(ReceitaMapper.ToDtoProjection)
                .FirstOrDefaultAsync()
                ?? throw new NotFoundException("Receita não encontrada.");

            return receita;
        }

        public async Task<ReceitaDTO> CreateReceitaAsync(CreateReceitaRequestDTO dto, Guid userId, CancellationToken ct = default)
        {
            Guid? regraId = null;
            ReceitaRecorrencia? regraLocal = null;
            if (dto.RecorrenciaConfig is { } cfg && cfg.TipoRecorrencia != EnumRecorrencia.Unica)
            {
                var regra = new ReceitaRecorrencia
                {
                    Id = Guid.NewGuid(),
                    UserId = userId,
                    TipoRecorrencia = cfg.TipoRecorrencia,
                    DataInicio = cfg.DataInicio,
                    DataFim = cfg.DataFim,
                    DiaDoMes = cfg.DiaDoMes,
                    DiaDaSemana = cfg.DiaDaSemana,

                    // template da receita
                    Titulo = dto.Titulo,
                    Descricao = dto.Descricao,
                    Valor = dto.Valor,
                    Categoria = dto.Categoria,
                    ContaBancariaId = dto.ContaBancariaId,
                    NumeroDocumento = dto.NumeroDocumento,

                    UltimaGeracao = null,
                    ProximoVencimento = CalculateNextDueInitial(cfg, dto.Data),
                    Ativa = true
                };

                await _recorrenciaRepository.Add(regra);
                regraId = regra.Id;
                regraLocal = regra; // manter a mesma instância rastreada pelo DbContext

            }

                var receita = new Receita
                {
                    Id = Guid.NewGuid(),
                    Titulo = dto.Titulo,
                    Descricao = dto.Descricao,
                    Valor = dto.Valor,
                    Data = dto.Data,
                    DataRecebimento = dto.DataRecebimento,
                    Categoria = dto.Categoria,
                    Status = dto.Status,
                    NumeroDocumento = dto.NumeroDocumento,
                    ContaBancariaId = dto.ContaBancariaId,
                    UserId = userId,
                    Competencia = $"{dto.Data:MM/yyyy}",
                    RecorrenciaRegraId = regraId
                };

                await _receitaRepository.Add(receita);

                

                if (regraLocal is not null)
                {
                    regraLocal.UltimaGeracao = DateTime.UtcNow;
                    regraLocal.ProximoVencimento = CalculateNextDueAfter(dto.Data, dto.RecorrenciaConfig!);
                    await _recorrenciaRepository.Update(regraLocal);
                }

            return receita.ToDTO();
        }

        public async Task<ReceitaDTO> UpdateReceitaAsync(Guid id, UpdateReceitaRequestDTO dto, Guid userId, CancellationToken ct = default)
        {
            var receita = await _receitaRepository
                .Where(r => r.Id == id && r.UserId == userId)
                .FirstOrDefaultAsync(ct)
                ?? throw new NotFoundException("Receita não encontrada.");

            receita.Titulo = dto.Titulo;
            receita.Descricao = dto.Descricao;
            receita.Valor = dto.Valor;
            receita.Data = dto.Data;
            receita.DataRecebimento = dto.DataRecebimento;
            receita.Categoria = dto.Categoria;
            receita.Status = dto.Status;
            receita.NumeroDocumento = dto.NumeroDocumento;
            receita.ContaBancariaId = dto.ContaBancariaId;
            receita.Competencia = $"{dto.Data:MM/yyyy}";
            
            receita.Update();

            await _receitaRepository.Update(receita);

            return receita.ToDTO();
        }

        public async Task DeleteReceitaAsync(Guid id, Guid userId, CancellationToken ct = default)
        {
            var receita = await _receitaRepository
                .Where(r => r.Id == id && r.UserId == userId)
                .FirstOrDefaultAsync(ct)
                ?? throw new NotFoundException("Receita não encontrada.");

            await _receitaRepository.Delete(receita);
        }

        private static DateTime CalculateNextDueInitial(RecorrenciaConfigDTO cfg, DateTime dataSugestao)
        {
            return cfg.TipoRecorrencia switch
            {
                EnumRecorrencia.Mensal => GetMonthlyDate(cfg, dataSugestao),
                EnumRecorrencia.Semanal => GetWeeklyDate(cfg, dataSugestao),
                EnumRecorrencia.Anual => new DateTime(dataSugestao.Year, dataSugestao.Month, dataSugestao.Day),
                _ => dataSugestao
            };
        }

        private static DateTime CalculateNextDueAfter(DateTime baseDate, RecorrenciaConfigDTO cfg)
        {
            return cfg.TipoRecorrencia switch
            {
                EnumRecorrencia.Mensal => GetMonthlyDate(cfg, baseDate.AddMonths(1)),
                EnumRecorrencia.Semanal => GetWeeklyDate(cfg, baseDate.AddDays(7)),
                EnumRecorrencia.Anual => new DateTime(baseDate.Year + 1, baseDate.Month, baseDate.Day),
                _ => baseDate
            };
        }

        private static DateTime GetMonthlyDate(RecorrenciaConfigDTO cfg, DateTime seed)
        {
            var targetDay = cfg.DiaDoMes ?? seed.Day;
            var lastDay = DateTime.DaysInMonth(seed.Year, seed.Month);
            var day = Math.Min(targetDay, lastDay);
            return new DateTime(seed.Year, seed.Month, day);
        }

        private static DateTime GetWeeklyDate(RecorrenciaConfigDTO cfg, DateTime seed)
        {
            var target = cfg.DiaDaSemana ?? seed.DayOfWeek;
            int diff = ((int)target - (int)seed.DayOfWeek + 7) % 7;
            return seed.Date.AddDays(diff == 0 ? 7 : diff);
        }
    }
} 