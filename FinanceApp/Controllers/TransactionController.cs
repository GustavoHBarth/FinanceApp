using FinanceApp.API.Data;
using FinanceApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System;

namespace FinanceApp.API.Controllers
{
    [Authorize] // Exige autenticação JWT
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly FinanceDbContext _context;

        public TransactionController(FinanceDbContext context)
        {
            _context = context;
        }

        // GET: api/transaction
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions()
        {
            // Pega o UserId do JWT (é uma string)
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdString))
            {
                return Unauthorized("Usuário não autenticado.");
            }

            // Filtra as transações para o usuário autenticado e inclui o User relacionado
            var transactions = await _context.Transactions
                .Where(t => t.UserId == userIdString)  // Comparando como string
                .Include(t => t.User)  // Inclui o relacionamento com o User
                .ToListAsync();

            if (transactions == null || !transactions.Any())
            {
                return NoContent();  // Se não houver transações
            }

            return Ok(transactions);  // Retorna as transações do usuário com o User carregado
        }


        // POST: api/transaction
        [HttpPost]
        public async Task<ActionResult<Transaction>> CreateTransaction([FromBody] Transaction transaction)
        {
            // Pega o UserId do JWT e associa à transação
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdString))
            {
                return Unauthorized("Usuário não autenticado.");
            }

            // Não precisa mais de validação aqui, já que você está preenchendo UserId via JWT
            transaction.UserId = userIdString;

            // Adiciona a transação ao banco de dados
            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            // Retorna a transação criada
            return CreatedAtAction(nameof(GetTransactions), new { id = transaction.Id }, transaction);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTransaction(int id, Transaction transaction)
        {
            // Verifica se o ID da transação enviado corresponde ao ID da transação que queremos atualizar
            if (id != transaction.Id)
            {
                return BadRequest("ID da transação não corresponde.");
            }

            // Pega o UserId do JWT e associa à transação
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdString))
            {
                return Unauthorized("Usuário não autenticado.");
            }

            // Verifica se a transação existe e pertence ao usuário autenticado
            var existingTransaction = await _context.Transactions
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userIdString);  // Comparando como string agora

            if (existingTransaction == null)
            {
                return NotFound("Transação não encontrada ou não pertence ao usuário.");
            }

            // Atualiza os campos da transação
            existingTransaction.Amount = transaction.Amount;
            existingTransaction.Category = transaction.Category;
            existingTransaction.Description = transaction.Description;
            existingTransaction.Date = transaction.Date;

            // Salva as alterações no banco de dados
            await _context.SaveChangesAsync();

            return Ok(new { message = "Transação atualizada com sucesso!" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            // Pega o UserId do JWT para associar à transação
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdString))
            {
                return Unauthorized("Usuário não autenticado.");
            }

            if (!Guid.TryParse(userIdString, out Guid userId))
            {
                return Unauthorized("UserId inválido no token.");
            }

            // Busca a transação que queremos excluir, garantindo que pertence ao usuário autenticado
            var transaction = await _context.Transactions
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userIdString);

            if (transaction == null)
            {
                return NotFound("Transação não encontrada ou não pertence ao usuário.");
            }

            // Exclui a transação do banco de dados
            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Transação excluída com sucesso!" });
        }


    }
}
