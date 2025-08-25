using FinanceApp.Application.DTOs;
using FinanceApp.Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FinanceApp.Application.Responses;
using System.Security.Claims;

namespace FinanceApp.API.Controllers
{
    [ApiController]
    [Route("contas")]
    [Authorize]
    public class ContaController : ControllerBase
    {
        private readonly IContaService _contaService;

        public ContaController(IContaService contaService)
        {
            _contaService = contaService;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetContas([FromQuery] int? month = null, [FromQuery] int? year = null)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !Guid.TryParse(userId, out var userGuid))
                return Unauthorized();

            var contas = await _contaService.GetContas(userGuid, month, year);

            return Ok(new ApiResponse<List<ContaDTO>>
            {
                Success = true,
                Data = contas
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetContaById(Guid id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !Guid.TryParse(userId, out var userGuid))
                return Unauthorized();

            var contas = await _contaService.GetContasById(id, userGuid);

            return Ok(new ApiResponse<ContaDTO>
            {
                Success = true,
                Data = contas
            });

        }

        [HttpPost]
        public async Task<IActionResult> CreateConta([FromBody] CreateContaRequestDTO dto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !Guid.TryParse(userId, out var userGuid))
                return Unauthorized();

            if (dto.EhParcelado)
            {
                if (!dto.TotalParcelas.HasValue)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Para conta parcelada, TotalParcelas é obrigatório",
                        Data = null
                    });
                }
                
                if (dto.TotalParcelas.Value < 2 || dto.TotalParcelas.Value > 100)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Total de parcelas deve ser entre 2 e 100",
                        Data = null
                    });
                }
            }
            else
            {
                dto.TotalParcelas = null;
                dto.DataPrimeiraParcela = null;
            }

            var conta = await _contaService.CreateContaAsync(dto, userGuid);

            return Ok(new ApiResponse<ContaDTO>
            {
                Success = true,
                Data = conta
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateConta(Guid id, [FromBody] UpdateContaRequestDTO dto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !Guid.TryParse(userId, out var userGuid))
                return Unauthorized();

            var conta = await _contaService.UpdateContaAsync(id, dto, userGuid);

            return Ok(new ApiResponse<ContaDTO>
            {
                Success = true,
                Data = conta
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConta(Guid id, [FromQuery] bool deleteParcelas = false)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !Guid.TryParse(userId, out var userGuid))
                return Unauthorized();

            await _contaService.DeleteContaAsync(id, userGuid, deleteParcelas);

            return Ok(new ApiResponse<object>
            {
                Success = true,
                Data = null
            });
        }
    }
}