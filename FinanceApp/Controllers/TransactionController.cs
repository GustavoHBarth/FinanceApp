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

            // Converte o UserId de string para Guid
            if (!Guid.TryParse(userIdString, out Guid userId))
            {
                return Unauthorized("UserId inválido no token.");
            }

            // Filtra as transações para o usuário autenticado
            var transactions = await _context.Transactions
                .Where(t => t.UserId == userId)  // Aqui comparamos dois GUIDs
                .ToListAsync();

            if (transactions == null || !transactions.Any())
            {
                return NoContent();  // Se não houver transações
            }

            return Ok(transactions);  // Retorna as transações do usuário
        }

        // POST: api/transaction
        [HttpPost]
        public async Task<ActionResult<Transaction>> CreateTransaction(Transaction transaction)
        {
            // Pega o UserId do JWT e associa à transação
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdString))
            {
                return Unauthorized("Usuário não autenticado.");
            }

            // Converte o UserId de string para Guid
            if (!Guid.TryParse(userIdString, out Guid userId))
            {
                return Unauthorized("UserId inválido no token.");
            }

            // Associa o UserId ao campo da transação (Guid)
            transaction.UserId = userId;

            // Adiciona a transação ao banco de dados
            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            // Retorna a transação criada
            return CreatedAtAction(nameof(GetTransactions), new { id = transaction.Id }, transaction);
        }
    }
}
