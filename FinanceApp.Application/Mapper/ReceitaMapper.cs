using FinanceApp.Application.DTOs.Receita;
using FinanceApp.Domain.Entities;
using System.Linq.Expressions;

namespace FinanceApp.Application.Mapper
{
    public static class ReceitaMapper
    {
        public static Expression<Func<Receita, ReceitaDTO>> ToDtoProjection => r => new ReceitaDTO
        {
            Id = r.Id,
            Titulo = r.Titulo,
            Descricao = r.Descricao,
            Valor = r.Valor,
            Data = r.Data,
            DataRecebimento = r.DataRecebimento,
            Categoria = r.Categoria,
            Status = r.Status,
            NumeroDocumento = r.NumeroDocumento,
            ContaBancariaId = r.ContaBancariaId,
            CreatedAt = r.CreatedAt,
            UpdatedAt = r.UpdatedAt
        };
        public static ReceitaDTO ToDTO(this Receita entity)
        {
            var dto = new ReceitaDTO
            {
                Id = entity.Id,
                Titulo = entity.Titulo,
                Descricao = entity.Descricao,
                Valor = entity.Valor,
                Data = entity.Data,
                DataRecebimento = entity.DataRecebimento,
                Categoria = entity.Categoria,
                Status = entity.Status,
                NumeroDocumento = entity.NumeroDocumento,
                ContaBancariaId = entity.ContaBancariaId,
                CreatedAt = entity.CreatedAt,
                UpdatedAt = entity.UpdatedAt
            };

            return dto;
        }
    }
} 