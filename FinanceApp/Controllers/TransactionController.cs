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
using iText.Kernel.Pdf;
using iText.Layout.Element;
using System.Text;
using iText.Layout;


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

        // 🔹 EXPORTAÇÃO PARA CSV
        [HttpGet("report/csv")]
        public async Task<IActionResult> GetTransactionReportCsv(DateTime? startDate, DateTime? endDate)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdString))
            {
                return Unauthorized("Usuário não autenticado.");
            }

            var transactions = _context.Transactions
                .Where(t => t.UserId == userIdString)
                .AsQueryable();

            if (startDate.HasValue)
                transactions = transactions.Where(t => t.Date >= startDate.Value);
            if (endDate.HasValue)
                transactions = transactions.Where(t => t.Date <= endDate.Value);

            var transactionList = await transactions.ToListAsync();

            var csv = new StringBuilder();
            csv.AppendLine("Data,Categoria,Descrição,Valor");

            foreach (var transaction in transactionList)
            {
                csv.AppendLine($"{transaction.Date:yyyy-MM-dd},{transaction.Category},{transaction.Description},{transaction.Amount}");
            }

            var bytes = Encoding.UTF8.GetBytes(csv.ToString());
            return File(bytes, "text/csv", "relatorio_transacoes.csv");
        }

        // EXPORTAÇÃO PARA PDF
        [HttpGet("report/pdf")]
        public async Task<IActionResult> GetTransactionReportPdf(DateTime? startDate, DateTime? endDate)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdString))
            {
                return Unauthorized("Usuário não autenticado.");
            }

            // Buscar o saldo atual do usuário na tabela Balances
            var balance = await _context.Balances
                .Where(b => b.BalanceUserId == userIdString)
                .Select(b => b.Amount)
                .FirstOrDefaultAsync();

            var transactions = _context.Transactions
                .Where(t => t.UserId == userIdString)
                .AsQueryable();

            if (startDate.HasValue)
                transactions = transactions.Where(t => t.Date >= startDate.Value);
            if (endDate.HasValue)
                transactions = transactions.Where(t => t.Date <= endDate.Value);

            var transactionList = await transactions.ToListAsync();
            var totalAmount = transactionList.Sum(t => t.Amount);
            var finalValue = balance - totalAmount; // Cálculo do valor final

            using (var stream = new MemoryStream())
            {
                using (var writer = new PdfWriter(stream))
                {
                    using (var pdf = new PdfDocument(writer))
                    {
                        var document = new Document(pdf);
                        document.Add(new Paragraph("Relatório de Transações").SetFontSize(18).SetBold());

                        // Adicionando informações gerais
                        document.Add(new Paragraph($"Saldo Atual: {balance:C}"));
                        document.Add(new Paragraph($"Total de Gastos: {totalAmount:C}"));
                        document.Add(new Paragraph($"Valor Final: {finalValue:C}").SetBold());

                        // Criando a tabela com as transações
                        var table = new Table(4);
                        table.AddHeaderCell("Data");
                        table.AddHeaderCell("Categoria");
                        table.AddHeaderCell("Descrição");
                        table.AddHeaderCell("Valor");

                        foreach (var transaction in transactionList)
                        {
                            table.AddCell(transaction.Date.ToString("yyyy-MM-dd"));
                            table.AddCell(transaction.Category);
                            table.AddCell(transaction.Description);
                            table.AddCell(transaction.Amount.ToString("C"));
                        }

                        document.Add(table);
                    }
                }

                var fileName = $"relatorio_{DateTime.Now:yyyyMMddHHmmss}.pdf";
                var pdfBytes = stream.ToArray();

                return File(pdfBytes, "application/pdf", fileName);
            }
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
        public async Task<IActionResult> GetTransactionReport(DateTime? startDate, DateTime? endDate)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdString))
            {
                return Unauthorized("Usuário não autenticado.");
            }

            // Buscar saldo do usuário
            var balance = await _context.Balances
                .FirstOrDefaultAsync(b => b.BalanceUserId == userIdString);

            decimal currentBalance = balance?.Amount ?? 0; // Se não existir, assume 0

            var transactions = _context.Transactions
                .Where(t => t.UserId == userIdString)
                .AsQueryable();

            // Aplicar filtros de data
            if (startDate.HasValue)
                transactions = transactions.Where(t => t.Date >= startDate.Value);
            if (endDate.HasValue)
                transactions = transactions.Where(t => t.Date <= endDate.Value);

            // Verificar se há transações antes de calcular
            var transactionList = await transactions.ToListAsync();
            if (!transactionList.Any())
            {
                return Ok(new
                {
                    TotalAmount = 0,
                    DailyAverage = 0,
                    WeeklyAverage = 0,
                    MonthlyAverage = 0,
                    Balance = currentBalance,
                    FinalValue = currentBalance, // Se não houver transações, o saldo final é o próprio saldo
                    Categories = new List<object>()
                });
            }

            // Total geral das transações
            var totalAmount = transactionList.Sum(t => t.Amount);

            // Agrupamento por categoria
            var categoryReport = transactionList
                .GroupBy(t => t.Category)
                .Select(g => new
                {
                    Category = g.Key.ToString(),
                    TotalAmount = g.Sum(t => t.Amount)
                })
                .ToList();

            // Calcular intervalo de dias
            var firstDate = transactionList.Min(t => t.Date);
            var lastDate = transactionList.Max(t => t.Date);
            var totalDays = (lastDate - firstDate).TotalDays + 1;

            // Evitar divisão por zero
            totalDays = totalDays > 0 ? totalDays : 1;

            // Cálculo das médias
            var dailyAvg = totalAmount / (decimal)totalDays;
            var weeklyAvg = dailyAvg * 7;
            var monthlyAvg = dailyAvg * 30;

            // Calcular o valor final (saldo - transações)
            var finalValue = currentBalance - totalAmount;

            return Ok(new
            {
                TotalAmount = totalAmount,
                DailyAverage = dailyAvg,
                WeeklyAverage = weeklyAvg,
                MonthlyAverage = monthlyAvg,
                Balance = currentBalance,
                FinalValue = finalValue,
                Categories = categoryReport
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
