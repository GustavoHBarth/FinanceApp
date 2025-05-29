using FinanceApp.Domain.Entites;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FinanceApp.Data.Mapping
{
    public static class Map
    {
        internal static Action<EntityTypeBuilder<Contas>> MappingConta()
        {
            return entity =>
            {
                entity.ToTable("Contas");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.Valor)
                      .HasPrecision(18, 2)
                      .IsRequired();

                entity.Property(e => e.Descricao)
                      .HasMaxLength(200)
                      .IsRequired();

                entity.Property(e => e.Categoria)
                      .IsRequired();

                // Exemplo adicional de filtros ou índices se precisar
                // entity.HasQueryFilter(e => !e.Excluido);
            };
        }
    }
}
