using FinanceApp.Application.DTOs;
using FinanceApp.Application.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Saturnia.Contracts.Responses;

namespace FinanceApp.API.Controllers
{
    [ApiController]
    public class ContaController : Controller
    {
        private readonly IContaService _contaService;

        public ContaController(IContaService contaService)
        {
            _contaService = contaService;
        }

        [HttpGet("contas")]
        public async Task<IActionResult> GetContas()
        {
            var contas = await _contaService.GetContas();

            return Ok(new ApiResponse<List<ContaDTO>>
            {
                Success = true,
                Data = contas
            });
        }

        [HttpGet("contas/{id}")]
        public async Task<IActionResult> GetContaById(Guid id)
        {
            var contas = await _contaService.GetContasById(id);

            return Ok(new ApiResponse<ContaDTO>
            {
                Success = true,
                Data = contas
            });

        }

        [HttpPost("contas")]
        public async Task<IActionResult> CreateConta([FromBody] CreateContaRequestDTO dto)
        {
            var conta = await _contaService.CreateContaAsync(dto);
            return Ok(ApiResponse<ContaDTO>.SendSuccess(conta, "Conta criada com sucesso!"));
        }
    }
}
