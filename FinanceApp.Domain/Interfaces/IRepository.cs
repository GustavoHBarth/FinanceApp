using System.Linq.Expressions;

namespace FinanceApp.Domain.Interfaces
{
    public interface IRepository<T> where T : class
    {
        /// <summary>
        /// Returns all entities of type T.
        /// </summary>
        IQueryable<T> GetAll();

        /// <summary>
        /// Returns an entity of type T by its ID.
        /// </summary>
        /// <param name="id">Entity ID.</param>
        /// <returns>The corresponding entity or null if not found.</returns>
        Task<T?> GetById(Guid id);

        /// <summary>
        /// Adds a new entity of type T.
        /// </summary>
        /// <param name="entity">The entity to be added.</param>
        Task Add(T entity);

        /// <summary>
        /// Adds multiple entities of type T.
        /// </summary>
        /// <param name="entities">The list of entities to be added.</param>
        Task AddRange(IEnumerable<T> entities);

        /// <summary>
        /// Updates an existing entity of type T.
        /// </summary>
        /// <param name="entity">The entity with updated information.</param>
        Task Update(T entity);

        /// <summary>
        /// Deletes an entity of type T.
        /// </summary>
        /// <param name="id">ID of the entity to be deleted.</param>
        Task Delete(T entity);

        /// <summary>
        /// Deletes an entity by ID.
        /// </summary>
        /// <param name="id">ID of the entity to be deleted.</param>
        Task DeleteById(Guid id);

        /// <summary>
        /// Saves changes in the database context.
        /// </summary>
        Task Commit();

        /// <summary>
        /// Returns a list of entities of type T that match a specific filter.
        /// </summary>
        /// <param name="predicate">Expression to filter the entities.</param>
        /// <returns>List of filtered entities.</returns>
        IQueryable<T> Where(Expression<Func<T, bool>> predicate);

        /// <summary>
        /// Returns if there is any entity that matches a specific filter.
        /// </summary>
        /// <param name="predicate">Expression to filter the entities.</param>
        /// <returns>Boolean.</returns>
        Task<bool> Exists(Expression<Func<T, bool>> predicate);
    }
}
