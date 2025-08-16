using FinanceApp.Application.DTOs;
using FinanceApp.Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FinanceApp.Application.Responses;
using System.Security.Claims;

namespace FinanceApp.API.Controllers
{
    [ApiController]
    [Route("parcelas")]
    [Authorize]
    public class ParcelaController : ControllerBase
    {
        private readonly IParcelaService _parcelaService;

        public ParcelaController(IParcelaService parcelaService)
        {
            _parcelaService = parcelaService;
        }

        [HttpGet("conta/{contaId}")]
        public async Task<IActionResult> GetParcelasByContaId(Guid contaId)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !Guid.TryParse(userId, out var userGuid))
                return Unauthorized();

            var parcelas = await _parcelaService.GetParcelasByContaId(contaId, userGuid);

            return Ok(new ApiResponse<List<ParcelaDTO>>
            {
                Success = true,
                Data = parcelas
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetParcelaById(Guid id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !Guid.TryParse(userId, out var userGuid))
                return Unauthorized();

            var parcela = await _parcelaService.GetParcelaById(id, userGuid);

            return Ok(new ApiResponse<ParcelaDTO>
            {
                Success = true,
                Data = parcela
            });
        }

        [HttpPost]
        public async Task<IActionResult> CreateParcela([FromBody] CreateParcelaRequestDTO dto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !Guid.TryParse(userId, out var userGuid))
                return Unauthorized();

            var parcela = await _parcelaService.CreateParcelaAsync(dto, userGuid);

            return Ok(new ApiResponse<ParcelaDTO>
            {
                Success = true,
                Data = parcela
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateParcela(Guid id, [FromBody] UpdateParcelaRequestDTO dto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !Guid.TryParse(userId, out var userGuid))
                return Unauthorized();

            var parcela = await _parcelaService.UpdateParcelaAsync(id, dto, userGuid);

            return Ok(new ApiResponse<ParcelaDTO>
            {
                Success = true,
                Data = parcela
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteParcela(Guid id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !Guid.TryParse(userId, out var userGuid))
                return Unauthorized();

            await _parcelaService.DeleteParcelaAsync(id, userGuid);

            return Ok(new ApiResponse<object>
            {
                Success = true,
                Data = null
            });
        }

        [HttpGet("vencidas")]
        public async Task<IActionResult> GetParcelasVencidas()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !Guid.TryParse(userId, out var userGuid))
                return Unauthorized();

            var parcelas = await _parcelaService.GetParcelasVencidas(userGuid);

            return Ok(new ApiResponse<List<ParcelaDTO>>
            {
                Success = true,
                Data = parcelas
            });
        }
    }
}
