using FinanceApp.Application.DTOs.Resumo;
using FinanceApp.Application.Responses;
using FinanceApp.Application.Services.Interfaces;
using FinanceApp.Domain.Entities;
using FinanceApp.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FinanceApp.API.Controllers
{
    [ApiController]
    [Route("resumo")]
    [Authorize]
    public class ResumoGeralController : Controller
    {
        private readonly IResumoGeralService _resumoGeralService;

        public ResumoGeralController(IResumoGeralService resumoGeralService)
        {
            _resumoGeralService = resumoGeralService;
        }

        [HttpGet("receita")]
        public async Task<IActionResult> GetReceitasResumo([FromQuery] int month, [FromQuery] int year, [FromQuery] EnumStatusReceita? status, CancellationToken ct)
        {
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdStr) || !Guid.TryParse(userIdStr, out var userId))
                return Unauthorized();

            var data = await _resumoGeralService.GetReceitasDashboardAsync(userId, month, year, status, ct);
            return Ok(ApiResponse<ReceitasDashboardDTO>.SendSuccess(data));

        }
    }
}
