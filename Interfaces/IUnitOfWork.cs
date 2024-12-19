using WorkshopManager.Interfaces.RepositoryInterfaces;

namespace WorkshopManager.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IJobRepository Jobs { get; }
        IWorkerRepository Workers { get; }
        ISupplyRepository Supplies { get; }
        Task<int> CompleteAsync();
    }
}
