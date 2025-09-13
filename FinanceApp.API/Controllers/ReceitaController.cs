using FinanceApp.Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FinanceApp.Application.Responses;
using System.Security.Claims;
using FinanceApp.Application.DTOs.Receita;
using FinanceApp.Application.Services;

namespace FinanceApp.API.Controllers
{
    [ApiController]
    [Route("receitas")]
    [Authorize]
    public class ReceitaController : ControllerBase
    {
        private readonly IRecorrenciaService _recorrenciaService;
        private readonly IReceitaService _receitaService;

        public ReceitaController(IReceitaService receitaService, IRecorrenciaService recorrenciaService)
        {
            _receitaService = receitaService;
            _recorrenciaService = recorrenciaService;
        }

        [HttpGet]
        public async Task<IActionResult> GetReceitas([FromQuery] ReceitaParamsDTO query, CancellationToken ct)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !Guid.TryParse(userId, out var userGuid))
                return Unauthorized();

            await _recorrenciaService.GerarPendentes(userGuid, DateTime.UtcNow, ct);

            var receitas = await _receitaService.GetReceitas(userGuid, query, ct);

            return Ok(new ApiResponse<PagedResultDTO<ReceitaDTO>>
            {
                Success = true,
                Data = receitas
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetReceitaById(Guid id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !Guid.TryParse(userId, out var userGuid))
                return Unauthorized();

            var receita = await _receitaService.GetReceitaById(id, userGuid);

            return Ok(new ApiResponse<ReceitaDTO>
            {
                Success = true,
                Data = receita
            });
        }

        [HttpPost]
        public async Task<IActionResult> CreateReceita([FromBody] CreateReceitaRequestDTO dto, CancellationToken ct)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !Guid.TryParse(userId, out var userGuid))
                return Unauthorized();

            var receita = await _receitaService.CreateReceitaAsync(dto, userGuid, ct);

            return CreatedAtAction(nameof(GetReceitaById), new { id = receita.Id }, new ApiResponse<ReceitaDTO>
            {
                Success = true,
                Data = receita
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReceita(Guid id, [FromBody] UpdateReceitaRequestDTO dto, CancellationToken ct)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !Guid.TryParse(userId, out var userGuid))
                return Unauthorized();

            var receita = await _receitaService.UpdateReceitaAsync(id, dto, userGuid, ct);

            return Ok(new ApiResponse<ReceitaDTO>
            {
                Success = true,
                Data = receita
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReceita(Guid id, CancellationToken ct)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !Guid.TryParse(userId, out var userGuid))
                return Unauthorized();

            await _receitaService.DeleteReceitaAsync(id, userGuid, ct);

            return Ok(new ApiResponse<object>
            {
                Success = true,
                Data = null
            });
        }
    }
} 