using FinanceApp.Application.DTOs;
using FinanceApp.Domain.Entities;

namespace FinanceApp.Application.Mapper
{
    public static class ReceitaMapper
    {
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
                Recorrencia = entity.Recorrencia,
                NumeroDocumento = entity.NumeroDocumento,
                ContaBancariaId = entity.ContaBancariaId,
                CreatedAt = entity.CreatedAt,
                UpdatedAt = entity.UpdatedAt
            };

            return dto;
        }
    }
} 