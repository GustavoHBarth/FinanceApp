using FinanceApp.Application.DTOs;
using FinanceApp.Domain.Entities;

namespace FinanceApp.Application.Mapper
{
    public static class ParcelaMapper
    {
        public static ParcelaDTO ToDTO(this Parcela entity)
        {
            return new ParcelaDTO
            {
                Id = entity.Id,
                ContaId = entity.ContaId,
                NumeroParcela = entity.NumeroParcela,
                TotalParcelas = entity.TotalParcelas,
                ValorParcela = entity.ValorParcela,
                DataVencimento = entity.DataVencimento,
                Observacao = entity.Observacao,
                CreatedAt = entity.CreatedAt,
                UpdatedAt = entity.UpdatedAt
            };
        }
    }
}