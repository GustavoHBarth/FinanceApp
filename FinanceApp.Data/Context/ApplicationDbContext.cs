using FinanceApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace FinanceApp.Data.Context
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Conta> Contas { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);

            foreach (var entity in modelBuilder.Model.GetEntityTypes())
            {
                foreach (var property in entity.GetProperties())
                {
                    if (property.ClrType == typeof(Guid))
                        property.SetColumnType("uniqueidentifier");

                    if (property.ClrType == typeof(DateTime))
                        property.SetValueConverter(new ValueConverter<DateTime, DateTime>(
                            v => v.ToUniversalTime(),
                            v => DateTime.SpecifyKind(v, DateTimeKind.Utc)
                        ));

                    if (property.ClrType == typeof(DateTime?))
                        property.SetValueConverter(new ValueConverter<DateTime?, DateTime?>(
                            v => v.HasValue ? v.Value.ToUniversalTime() : v,
                            v => v.HasValue ? DateTime.SpecifyKind(v.Value, DateTimeKind.Utc) : v
                        ));
                }
            }
        }
    }
}
