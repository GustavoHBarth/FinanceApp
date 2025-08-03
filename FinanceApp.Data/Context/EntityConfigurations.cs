using FinanceApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FinanceApp.Data.Context
{
    public class EntityConfigurations :
        IEntityTypeConfiguration<Conta>,
        IEntityTypeConfiguration<Receita>,
        IEntityTypeConfiguration<ResumoMensal>,
        IEntityTypeConfiguration<User>
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
            builder.Property(c => c.EhParcelado).IsRequired();
            builder.Property(c => c.NumeroParcela).IsRequired(false);
            builder.Property(c => c.TotalParcelas).IsRequired(false);
            builder.Property(c => c.NumeroDocumento).IsRequired(false);
            builder.Property(c => c.ContaBancariaId).IsRequired(false);

            builder.HasOne(c => c.User)
               .WithMany(u => u.Contas)
               .HasForeignKey(c => c.UserId)
               .OnDelete(DeleteBehavior.Cascade);
        }

        public void Configure(EntityTypeBuilder<Receita> builder)
        {
            builder.HasKey(r => r.Id);

            builder.Property(r => r.Titulo).IsRequired();
            builder.Property(r => r.Descricao).IsRequired(false);

            builder.Property(r => r.Valor).IsRequired();
            builder.Property(r => r.Data).IsRequired();
            builder.Property(r => r.DataRecebimento).IsRequired(false);
            builder.Property(r => r.Categoria).IsRequired();
            builder.Property(r => r.Status).IsRequired();
            builder.Property(r => r.Recorrencia).IsRequired(false);
            builder.Property(r => r.NumeroDocumento).IsRequired(false);
            builder.Property(r => r.ContaBancariaId).IsRequired(false);

            builder.HasOne(r => r.User)
                .WithMany(u => u.Receitas)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);
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
        }
    }
}
