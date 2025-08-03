using FinanceApp.Application.DTOs;
using FinanceApp.Domain.Entities;
using FinanceApp.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceApp.Application.Mapper
{
    public static class ContaMapper
    {
        public static ContaDTO ToDTO(this Conta entity)
        {
            var dto = new ContaDTO
            {
                Id = entity.Id,
                Titulo = entity.Titulo,
                Descricao = entity.Descricao,
                Valor = entity.Valor,
                Data = entity.Data,
                DataVencimento = entity.DataVencimento,
                Categoria = entity.Categoria,
                Status = entity.Status,
                Recorrencia = entity.Recorrencia,
                EhParcelado = entity.EhParcelado,
                NumeroParcela = entity.NumeroParcela,
                TotalParcelas = entity.TotalParcelas,
                NumeroDocumento = entity.NumeroDocumento,
                ContaBancariaId = entity.ContaBancariaId,
                CreatedAt = entity.CreatedAt,
                UpdatedAt = entity.UpdatedAt
            };

            return dto;
        }
    }
}
