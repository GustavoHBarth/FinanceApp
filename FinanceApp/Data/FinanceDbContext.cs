using FinanceApp.API.Models;
using FinanceApp.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FinanceApp.API.Data
{
    public class FinanceDbContext : IdentityDbContext<User>
    {
        public FinanceDbContext(DbContextOptions<FinanceDbContext> options) : base(options) { }

        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<User> Users { get; set; } // Se você tiver um modelo User

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Definir a chave estrangeira explicitamente
            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.User)
                .WithMany() // Assume que o User pode ter várias transações
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Restrict); // Pode ser CASCADE ou outros comportamentos
        }
    }
}
