using FinanceApp.Application.DTOs;
using FinanceApp.Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FinanceApp.Application.Responses;
using System.Security.Claims;

namespace FinanceApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ReceitaController : ControllerBase
    {
        private readonly IReceitaService _receitaService;

        public ReceitaController(IReceitaService receitaService)
        {
            _receitaService = receitaService;
        }

        [HttpGet]
        public async Task<IActionResult> GetReceitas()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !Guid.TryParse(userId, out var userGuid))
                return Unauthorized();

            var receitas = await _receitaService.GetReceitas(userGuid);

            return Ok(new ApiResponse<List<ReceitaDTO>>
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
        public async Task<IActionResult> CreateReceita([FromBody] CreateReceitaRequestDTO dto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !Guid.TryParse(userId, out var userGuid))
                return Unauthorized();

            var receita = await _receitaService.CreateReceitaAsync(dto, userGuid);

            return Ok(new ApiResponse<ReceitaDTO>
            {
                Success = true,
                Data = receita
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReceita(Guid id, [FromBody] UpdateReceitaRequestDTO dto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !Guid.TryParse(userId, out var userGuid))
                return Unauthorized();

            var receita = await _receitaService.UpdateReceitaAsync(id, dto, userGuid);

            return Ok(new ApiResponse<ReceitaDTO>
            {
                Success = true,
                Data = receita
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReceita(Guid id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !Guid.TryParse(userId, out var userGuid))
                return Unauthorized();

            await _receitaService.DeleteReceitaAsync(id, userGuid);

            return Ok(new ApiResponse<object>
            {
                Success = true,
                Data = null
            });
        }
    }
} 