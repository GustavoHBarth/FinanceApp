using FinanceApp.API.Data;
using FinanceApp.Models;
using Microsoft.EntityFrameworkCore;

namespace FinanceApp.Services
{
    public class BalanceService
    {
        private readonly FinanceDbContext _context;

        public BalanceService(FinanceDbContext context)
        {
            _context = context;
        }

        public async Task<Balance> CreateBalanceAsync(string userId, decimal amount)
        {
            var balance = new Balance
            {
                BalanceUserId = userId,
                Amount = amount
            };

            _context.Balances.Add(balance);
            await _context.SaveChangesAsync();

            return balance;
        }

        public async Task<Balance> GetBalanceAsync(string userId)
        {
            return await _context.Balances
                .FirstOrDefaultAsync(b => b.BalanceUserId == userId);
        }

        public async Task<Balance> UpdateBalanceAsync(string userId, decimal newAmount)
        {
            var balance = await _context.Balances
                .FirstOrDefaultAsync(b => b.BalanceUserId == userId);

            if (balance != null)
            {
                balance.Amount = newAmount;
                await _context.SaveChangesAsync();
                return balance;
            }

            return null;
        }

        public async Task DeleteBalanceAsync(string userId)
        {
            var balance = await _context.Balances
                .FirstOrDefaultAsync(b => b.BalanceUserId == userId);

            if (balance != null)
            {
                _context.Balances.Remove(balance);
                await _context.SaveChangesAsync();
            }
        }
    }
}
