using FinanceApp.Application.Services.Interfaces;
using FinanceApp.Domain.Entities;
using FinanceApp.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using FinanceApp.Application.Mapper;
using FinanceApp.Application.Exceptions;
using FinanceApp.Application.DTOs.Receita;
using FinanceApp.Application.Responses;

namespace FinanceApp.Application.Services
{
    public class ReceitaService : IReceitaService
    {
        public readonly IRepository<Receita> _receitaRepository;

        public ReceitaService(IRepository<Receita> receitaRepository)
        {
            _receitaRepository = receitaRepository;
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
                .FirstOrDefaultAsync()
                ?? throw new NotFoundException("Receita não encontrada.");

            return receita.ToDTO();
        }

        public async Task<ReceitaDTO> CreateReceitaAsync(CreateReceitaRequestDTO dto, Guid userId)
        {
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
                Recorrencia = dto.Recorrencia,
                NumeroDocumento = dto.NumeroDocumento,
                ContaBancariaId = dto.ContaBancariaId,
                UserId = userId
            };

            await _receitaRepository.Add(receita);

            return receita.ToDTO();
        }

        public async Task<ReceitaDTO> UpdateReceitaAsync(Guid id, UpdateReceitaRequestDTO dto, Guid userId)
        {
            var receita = await _receitaRepository
                .Where(r => r.Id == id && r.UserId == userId)
                .FirstOrDefaultAsync()
                ?? throw new NotFoundException("Receita não encontrada.");

            receita.Titulo = dto.Titulo;
            receita.Descricao = dto.Descricao;
            receita.Valor = dto.Valor;
            receita.Data = dto.Data;
            receita.DataRecebimento = dto.DataRecebimento;
            receita.Categoria = dto.Categoria;
            receita.Status = dto.Status;
            receita.Recorrencia = dto.Recorrencia;
            receita.NumeroDocumento = dto.NumeroDocumento;
            receita.ContaBancariaId = dto.ContaBancariaId;
            
            receita.Update();

            await _receitaRepository.Update(receita);

            return receita.ToDTO();
        }

        public async Task DeleteReceitaAsync(Guid id, Guid userId)
        {
            var receita = await _receitaRepository
                .Where(r => r.Id == id && r.UserId == userId)
                .FirstOrDefaultAsync()
                ?? throw new NotFoundException("Receita não encontrada.");

            await _receitaRepository.Delete(receita);
        }
    }
} 