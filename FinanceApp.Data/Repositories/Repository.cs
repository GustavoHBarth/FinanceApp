using Microsoft.EntityFrameworkCore;
using FinanceApp.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using FinanceApp.Data.Interfaces;
using FinanceApp.Domain.Entities;

namespace FinanceApp.Data.Repositories
{
    public class Repository<T> : IRepository<T> where T : Entity
    {
        protected readonly IUnitOfWork _context;
        protected readonly DbSet<T> _dbSet;

        public Repository(IUnitOfWork context)
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

        // Adiciona múltiplas entidade e salva automaticamente
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
            entity.SysDeleted = true;
            _context.Entry(entity).State = EntityState.Modified;
            await Commit();
        }

        // Aplica soft delete pelo ID
        public virtual async Task DeleteById(Guid id)
        {
            var entity = await GetById(id);
            if (entity != null)
            {
                entity.SysDeleted = true;
                _context.Entry(entity).State = EntityState.Modified;
                await Commit();
            }
        }


        // Salva todas as alterações no contexto
        public virtual async Task Commit()
        {
            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException dbEx)
            {
                throw new Exception($"Erro ao salvar mudanças no banco. {dbEx.InnerException?.Message ?? dbEx.Message}");
            }
        }

        // Verifica se alguma entidade atende ao critério especificado
        public virtual async Task<bool> Exists(Expression<Func<T, bool>> predicate)
        {
            return await _dbSet.Where(e => !e.SysDeleted).AnyAsync(predicate);
        }

        // Retorna todas as entidades ativas
        public virtual IQueryable<T> GetAll()
        {
            return _dbSet.Where(e => !e.SysDeleted);
        }

        // Retorna uma entidade específica pelo ID (inclui as excluídas)
        public virtual async Task<T?> GetById(Guid id)
        {
            return await _dbSet.FirstOrDefaultAsync(e => e.Id == id);
        }

        // Filtra entidades ativas baseado em um critério
        public virtual IQueryable<T> Where(Expression<Func<T, bool>> predicate)
        {
            return _dbSet.Where(predicate).Where(e => !e.SysDeleted);
        }
    }
}
