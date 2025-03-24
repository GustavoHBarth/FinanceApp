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

        //EndPoint para filtrar transações
        [HttpGet("filter")]
        public async Task<IActionResult> GetTransactionsByFilter(
      DateTime? startDate,
      DateTime? endDate,
      decimal? minAmount,
      decimal? maxAmount,
      string category = null)

        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdString))
            {
                return Unauthorized("Usuário não autenticado.");
            }

            var transactions = _context.Transactions.Where(t => t.UserId == userIdString).AsQueryable();

            if (startDate.HasValue)
            {
                transactions = transactions.Where(t => t.Date >= startDate);
            }

            if (endDate.HasValue)
            {
                transactions = transactions.Where(t => t.Date <= endDate);
            }

            if (!string.IsNullOrEmpty(category))
            {
                transactions = transactions.Where(t => EF.Functions.Like(t.Category.ToLower(), $"%{category.ToLower()}%"));
            }

            if (minAmount.HasValue)
            {
                transactions = transactions.Where(t => t.Amount >= minAmount.Value);
            }

            if (maxAmount.HasValue)
            {
                transactions = transactions.Where(t => t.Amount <= maxAmount.Value);
            }

            // Verifica o valor do userId no resultado para garantir que não é um valor padrão
            var result = await transactions.ToListAsync();

            // Se não encontrar transações, pode ser útil retornar um status indicando que não há dados
            if (result.Count == 0)
            {
                return NotFound("Nenhuma transação encontrada.");
            }

            return Ok(result);
        }


        //EndPoint para gerar o relatório de transações
        [HttpGet("report")]
        public async Task<IActionResult> GetTransactionReport(DateTime? startDate, DateTime? endDate, string category = null)
        {
            var transactions = _context.Transactions.AsQueryable();

            // Aplica filtros se fornecidos
            if (startDate.HasValue)
                transactions = transactions.Where(t => t.Date >= startDate.Value);
            if (endDate.HasValue)
                transactions = transactions.Where(t => t.Date <= endDate.Value);
            if (!string.IsNullOrEmpty(category))
                transactions = transactions.Where(t => t.Category.Contains(category));

            // Calcula o total de valor das transações
            var totalAmount = await transactions.SumAsync(t => t.Amount);

            // Retorna o relatório
            return Ok(new
            {
                TotalAmount = totalAmount
            });
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
            // Pega o UserId do JWT
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdString))
            {
                // Retorna um erro se o usuário não estiver autenticado
                return Unauthorized("Usuário não autenticado.");
            }

            // Associa o UserId ao objeto Transaction
            transaction.UserId = userIdString;

            // Adiciona a transação ao banco de dados
            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            // Retorna a transação criada, com um status 201 (Created)
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
