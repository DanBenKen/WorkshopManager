using WorkshopManager.Models;

namespace WorkshopManager.Interfaces.RepositoryInterfaces
{
    public interface IWorkerRepository
    {
        Task<Worker?> GetWorkerByIdAsync(int id);
        Task<IEnumerable<Worker>> GetAllWorkersAsync();
        public Worker AddWorker(Worker worker);
        public Worker UpdateWorker(Worker worker);
        public Worker DeleteWorker(Worker worker);
    }
}
