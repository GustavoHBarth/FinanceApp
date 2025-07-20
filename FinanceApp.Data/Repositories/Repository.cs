using Microsoft.EntityFrameworkCore;
using FinanceApp.Domain.Interfaces;
using System.Linq.Expressions;
using FinanceApp.Domain.Entities.BaseEntities;
using FinanceApp.Data.Context;

namespace FinanceApp.Data.Repositories
{
    public class Repository<T> : IRepository<T> where T : BaseEntity
    {
        protected readonly ApplicationDbContext _context;
        protected readonly DbSet<T> _dbSet;

        public Repository(ApplicationDbContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }

        // Adiciona uma nova entidade e salva automaticamente
        public virtual async Task Add(T entity)
        {
            await _dbSet.AddAsync(entity);
            await Commit();
        }

        // Adiciona múltiplas entidades e salva automaticamente
        public virtual async Task AddRange(IEnumerable<T> entities)
        {
            await _dbSet.AddRangeAsync(entities);
            await Commit();
        }

        // Atualiza uma entidade existente
        public virtual async Task Update(T entity)
        {
            _dbSet.Update(entity);
            await Commit();
        }

        // Aplica soft delete na entidade
        public virtual async Task Delete(T entity)
        {
            entity.Delete();
            _context.Entry(entity).State = EntityState.Modified;
            await Commit();
        }

        // Aplica soft delete pelo ID
        public virtual async Task DeleteById(Guid id)
        {
            var entity = await GetById(id);
            if (entity != null)
            {
                entity.Delete();
                _context.Entry(entity).State = EntityState.Modified;
                await Commit();
            }
        }

        // Salva todas as alterações no contexto
        public virtual async Task Commit()
        {
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao salvar mudanças no banco. {ex.InnerException?.Message ?? ex.Message}");
            }
        }

        // Verifica se alguma entidade atende ao critério especificado
        public virtual async Task<bool> Exists(Expression<Func<T, bool>> predicate)
        {
            return await _dbSet.Where(e => !e.SysIsDeleted).AnyAsync(predicate);
        }

        // Retorna todas as entidades ativas
        public virtual IQueryable<T> GetAll()
        {
            return _dbSet.AsNoTracking()
                .Where(e => !e.SysIsDeleted);
        }

        // Retorna uma entidade específica pelo ID (inclui as excluídas)
        public virtual async Task<T?> GetById(Guid id)
        {
            return await _dbSet.AsNoTracking()
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        // Filtra entidades ativas baseado em um critério
        public virtual IQueryable<T> Where(Expression<Func<T, bool>> predicate)
        {
            return _dbSet.Where(predicate).Where(e => !e.SysIsDeleted);
        }
    }
}
