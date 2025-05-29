using FinanceApp.Data.Interfaces;
using FinanceApp.Domain.Entites;
using FinanceApp.Domain.Entities;
using FinanceApp.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;

namespace FinanceApp.Data.Context
{
    public class UnitOfWork : DbContext, IUnitOfWork
    {
        public UnitOfWork(DbContextOptions<UnitOfWork> options) : base(options)
        {
        }

        // Declara o DbSet da sua entidade principal Contas
        public virtual DbSet<Contas> Contas { get; set; }

        // public virtual DbSet<OutraEntidade> OutraEntidades { get; set; }

        // Método genérico para acessar qualquer DbSet
        public DbSet<T> Set<T>() where T : class => base.Set<T>();

        // Método para acessar o Entry da entidade
        public EntityEntry Entry(object entity) => base.Entry(entity);

        // Configurações adicionais de entidades e relacionamentos
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuração simples para Contas (pode expandir conforme necessidade)
            modelBuilder.Entity<Contas>(entity =>
            {
                entity.ToTable("Contas"); // nome da tabela no banco

                entity.HasKey(e => e.Id); // chave primária

                entity.Property(e => e.Descricao)
                    .IsRequired(false); // sua propriedade aceita null

                entity.Property(e => e.Valor)
                    .HasColumnType("decimal(18,2)")
                    .IsRequired(false);

                entity.Property(e => e.Categoria)
                    .HasConversion<int>(); // enum salvo como int no banco

                entity.Property(e => e.Data)
                    .IsRequired();

                // Configurações para as propriedades Sys* podem ser opcionais,
                // mas se quiser, pode configurar aqui também, ex:
                // entity.Property(e => e.SysInsertDate).HasDefaultValueSql("GETUTCDATE()");
            });

            // Configurações para outras entidades aqui...
        }

        // Override SaveChanges para gerenciar datas de inserção e atualização
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

        // Método para desfazer alterações pendentes no ChangeTracker
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
}
