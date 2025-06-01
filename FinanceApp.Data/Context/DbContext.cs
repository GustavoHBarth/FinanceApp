using FinanceApp.Data.Interfaces;
using FinanceApp.Domain.Entites;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

public class UnitOfWork : DbContext, IUnitOfWork
{
    public static readonly ILoggerFactory MyLoggerFactory = LoggerFactory.Create(builder => { /* logs */ });

    public UnitOfWork()
    {
    }

    public UnitOfWork(DbContextOptions<UnitOfWork> options) : base(options)
    {
    }

    public virtual DbSet<Contas> Contas { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseLoggerFactory(MyLoggerFactory);
            optionsBuilder.UseSqlServer("Data Source=DESKTOP-QT71C6T\\SQLEXPRESS;Initial Catalog=FinanceAppDb;Integrated Security=True;MultipleActiveResultSets=true;TrustServerCertificate=True;");
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Contas>(entity =>
        {
            entity.ToTable("Contas");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Descricao).IsRequired(false);
            entity.Property(e => e.Valor).HasColumnType("decimal(18,2)").IsRequired(false);
            entity.Property(e => e.Categoria).HasConversion<int>();
            entity.Property(e => e.Data).IsRequired();
        });
    }

    public override int SaveChanges()
    {
        var now = DateTime.UtcNow;
        foreach (var entry in ChangeTracker.Entries())
        {
            if (entry.State == EntityState.Added)
            {
                entry.Property("SysInsertDate").CurrentValue = now;
                entry.Property("SysUpdateDate").CurrentValue = now;
            }
            else if (entry.State == EntityState.Modified)
            {
                entry.Property("SysInsertDate").IsModified = false;
                entry.Property("SysInsertId").IsModified = false;
                entry.Property("SysUpdateDate").CurrentValue = now;
            }
        }
        return base.SaveChanges();
    }

    public void Rollback()
    {
        foreach (var entry in ChangeTracker.Entries())
        {
            switch (entry.State)
            {
                case EntityState.Modified:
                    entry.CurrentValues.SetValues(entry.OriginalValues);
                    entry.State = EntityState.Unchanged;
                    break;
                case EntityState.Added:
                    entry.State = EntityState.Detached;
                    break;
                case EntityState.Deleted:
                    entry.State = EntityState.Unchanged;
                    break;
            }
        }
    }
}
