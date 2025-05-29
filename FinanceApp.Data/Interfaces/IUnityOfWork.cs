using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;


namespace FinanceApp.Data.Interfaces
{
    public interface IUnitOfWork
    {
        DbSet<T> Set<T>() where T : class;
        EntityEntry Entry(object entity);
        int SaveChanges();
    }
}
