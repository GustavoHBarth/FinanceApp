using FinanceApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FinanceApp.Data.Context
{
    public class EntityConfigurations :
        IEntityTypeConfiguration<Conta>,
        IEntityTypeConfiguration<Receita>,
        IEntityTypeConfiguration<ReceitaRecorrencia>,
        IEntityTypeConfiguration<ResumoMensal>,
        IEntityTypeConfiguration<User>,
        IEntityTypeConfiguration<Parcela>
    {
        public void Configure(EntityTypeBuilder<Conta> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Titulo).IsRequired();
            builder.Property(c => c.Descricao).IsRequired(false);

            builder.Property(c => c.Valor).IsRequired();
            builder.Property(c => c.Data).IsRequired();
            builder.Property(c => c.DataVencimento).IsRequired(false);
            builder.Property(c => c.Categoria).IsRequired();
            builder.Property(c => c.Status).IsRequired();
            builder.Property(c => c.Recorrencia).IsRequired(false);
            builder.Property(c => c.NumeroDocumento).IsRequired(false);
            builder.Property(c => c.ContaBancariaId).IsRequired(false);

            builder.HasOne(c => c.User)
               .WithMany(u => u.Contas)
               .HasForeignKey(c => c.UserId)
               .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(c => c.Parcelas)
                .WithOne(p => p.Conta)
                .HasForeignKey(p => p.ContaId)
                .OnDelete(DeleteBehavior.NoAction);
        }

        public void Configure(EntityTypeBuilder<Receita> builder)
        {
            builder.HasKey(r => r.Id);

            builder.Property(r => r.Titulo).IsRequired();
            builder.Property(r => r.Descricao).IsRequired(false);

            builder.Property(r => r.Valor)
                .IsRequired()
                .HasColumnType("decimal(18,2)");

            builder.Property(r => r.Data)
                .IsRequired();

            builder.Property(r => r.DataRecebimento)
                .IsRequired(false);
            builder.Property(r => r.Categoria).IsRequired();
            builder.Property(r => r.Status).IsRequired();
            builder.Property(r => r.NumeroDocumento).IsRequired(false);
            builder.Property(r => r.ContaBancariaId).IsRequired(false);
            builder.Property(r => r.Competencia).IsRequired(false);

            builder.HasOne(r => r.User)
                .WithMany(u => u.Receitas)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(r => r.RecorrenciaRegra)
                .WithMany(rr => rr.Ocorrencias)
                .HasForeignKey(r => r.RecorrenciaRegraId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasIndex(r => new { r.UserId, r.Data });
            builder.HasIndex(r => new { r.UserId, r.CreatedAt });
            builder.HasIndex(r => new { r.UserId, r.RecorrenciaRegraId, r.Competencia }).IsUnique(false);
        }

        public void Configure(EntityTypeBuilder<ResumoMensal> builder)
        {
            builder.HasKey(rm => rm.Id);

            builder.Property(rm => rm.Mes).IsRequired();
            builder.Property(rm => rm.Ano).IsRequired();

            builder.Property(rm => rm.TotalReceitas).IsRequired();
            builder.Property(rm => rm.TotalDespesas).IsRequired();
        }

        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(u => u.Id);

            builder.Property(u => u.Name).IsRequired().HasMaxLength(100);
            builder.Property(u => u.Email).IsRequired().HasMaxLength(255);
            builder.Property(u => u.PasswordHash).IsRequired(false);

            builder.HasIndex(u => u.Email).IsUnique();

            builder.HasMany(u => u.Parcelas)
                .WithOne(p => p.User)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasMany(u => u.ReceitaRecorrencias)
                .WithOne(rr => rr.User)
                .HasForeignKey(rr => rr.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }

        public void Configure(EntityTypeBuilder<Parcela> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(p => p.ContaId).IsRequired();
            builder.Property(p => p.NumeroParcela).IsRequired();
            builder.Property(p => p.TotalParcelas).IsRequired();
            builder.Property(p => p.ValorParcela).IsRequired();
            builder.Property(p => p.DataVencimento).IsRequired();
            builder.Property(p => p.Observacao).IsRequired(false);
            builder.Property(p => p.UserId).IsRequired();

            builder.HasOne(p => p.Conta)
                .WithMany(c => c.Parcelas)
                .HasForeignKey(p => p.ContaId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(p => p.User)
                .WithMany(u => u.Parcelas)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.NoAction);
        }

        public void Configure(EntityTypeBuilder<ReceitaRecorrencia> builder)
        {
            builder.HasKey(rr => rr.Id);

            builder.Property(rr => rr.TipoRecorrencia).IsRequired();
            builder.Property(rr => rr.DataInicio).IsRequired();
            builder.Property(rr => rr.DataFim).IsRequired(false);

            builder.Property(rr => rr.DiaDoMes).IsRequired(false);
            builder.Property(rr => rr.DiaDaSemana).IsRequired(false);

            builder.Property(rr => rr.Titulo).IsRequired();
            builder.Property(rr => rr.Descricao).IsRequired(false);

            builder.Property(rr => rr.Valor)
                .IsRequired()
                .HasColumnType("decimal(18,2)");

            builder.Property(rr => rr.Categoria).IsRequired();
            builder.Property(rr => rr.NumeroDocumento).IsRequired(false);
            builder.Property(rr => rr.ContaBancariaId).IsRequired(false);

            builder.Property(rr => rr.UltimaGeracao).IsRequired(false);
            builder.Property(rr => rr.ProximoVencimento).IsRequired(false);
            builder.Property(rr => rr.Ativa).IsRequired();

            builder.HasIndex(rr => new { rr.UserId, rr.Ativa });
            builder.HasIndex(rr => new { rr.UserId, rr.ProximoVencimento });
        }
    }
}
