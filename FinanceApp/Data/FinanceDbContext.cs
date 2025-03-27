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
        public DbSet<Balance> Balances { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Definir a chave estrangeira explicitamente
            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.User)
                .WithMany() // Assume que o User pode ter várias transações
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Restrict); // Pode ser CASCADE ou outros comportamentos

            // Configuração da relação entre Balance e User
            modelBuilder.Entity<Balance>()
                .HasOne(b => b.User)
                .WithOne() // Um usuário tem um único saldo
                .HasForeignKey<Balance>(b => b.UserId)
                .OnDelete(DeleteBehavior.Cascade); // Se o usuário for deletado, o saldo também será
        }
    }
}
