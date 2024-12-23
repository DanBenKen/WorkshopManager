using WorkshopManager.Interfaces.RepositoryInterfaces;

namespace WorkshopManager.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IJobRepository JobRepository { get; }
        IWorkerRepository WorkerRepository { get; }
        ISupplyRepository SupplyRepository { get; }
        Task ExecuteInTransactionAsync(Func<Task> action);
        Task<int> SaveChangesAsync();
    }
}
