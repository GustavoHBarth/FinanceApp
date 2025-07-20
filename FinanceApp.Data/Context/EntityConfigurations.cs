using FinanceApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FinanceApp.Data.Context
{
    public class EntityConfigurations :
        IEntityTypeConfiguration<Conta>
    {
        public void Configure(EntityTypeBuilder<Conta> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Title).IsRequired();
            builder.Property(c => c.Descricao).IsRequired(false);

            builder.Property(c => c.Valor).IsRequired();
            builder.Property(c => c.Data).IsRequired();
            builder.Property(c => c.Categoria).IsRequired();
        }
    }
}
