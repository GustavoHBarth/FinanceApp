using FinanceApp.DTOs;
using FinanceApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using FinanceApp.Services;

namespace FinanceApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Garante que apenas usuários autenticados possam acessar as ações
    public class BalanceController : ControllerBase
    {
        private readonly BalanceService _balanceService;

        public BalanceController(BalanceService balanceService)
        {
            _balanceService = balanceService;
        }

        // Criação de um novo saldo
        [HttpPost]
     
        public async Task<ActionResult<Balance>> CreateBalance([FromBody] CreateBalanceRequest request)
        {
            // Obtendo o UserId diretamente do token JWT
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            // Se não encontrar o UserId no token, retorna Unauthorized
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("Usuário não autenticado.");
            }

            // Criando o saldo para o usuário autenticado
            var balance = await _balanceService.CreateBalanceAsync(userId, request.Amount);

            // Retornando o status Created com a URL correta para obter o saldo
            return CreatedAtAction(nameof(GetBalance), new { userId = balance.BalanceUserId }, balance);
        }

        // Obter o saldo de um usuário
        [HttpGet("{userId}")]
        public async Task<ActionResult<Balance>> GetBalance(string userId)
        {
            // Verifica se o UserId no token JWT é o mesmo do parâmetro
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (currentUserId != userId)
            {
                return Unauthorized("Você não tem permissão para acessar este saldo.");
            }

            // Obtém o saldo para o usuário
            var balance = await _balanceService.GetBalanceAsync(userId);

            if (balance == null)
                return NotFound();

            return Ok(balance);
        }

        // Atualizar o saldo de um usuário
        [HttpPut("{userId}")]
        public async Task<ActionResult<Balance>> UpdateBalance(string userId, [FromBody] UpdateBalanceRequest request)
        {
            // Verifica se o UserId no token JWT é o mesmo do parâmetro
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (currentUserId != userId)
            {
                return Unauthorized("Você não tem permissão para atualizar este saldo.");
            }

            // Atualiza o saldo do usuário
            var balance = await _balanceService.UpdateBalanceAsync(userId, request.NewAmount);

            if (balance == null)
                return NotFound();

            return Ok(balance);
        }

        // Deletar o saldo de um usuário
        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteBalance(string userId)
        {
            // Verifica se o UserId no token JWT é o mesmo do parâmetro
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (currentUserId != userId)
            {
                return Unauthorized("Você não tem permissão para deletar este saldo.");
            }

            // Deleta o saldo do usuário
            await _balanceService.DeleteBalanceAsync(userId);
            return NoContent();
        }
    }
}
