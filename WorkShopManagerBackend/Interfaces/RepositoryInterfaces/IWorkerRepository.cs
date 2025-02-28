using WorkshopManager.Models;

namespace WorkshopManager.Interfaces.RepositoryInterfaces
{
    public interface IWorkerRepository
    {
        Task<Worker?> GetWorkerByIdAsync(int? id);
        Task<IEnumerable<Worker>> GetAllWorkersAsync();
        Task<IEnumerable<Worker>> GetAllWorkersWithJobsAsync();
        Task<bool> ExistsAsync(int id);
        Task AddWorkerAsync(Worker worker);
        void UpdateWorker(Worker worker);
        void DeleteWorker(Worker worker);
        Task<int> GetWorkersCountAsync();
        Task<int> GetUnemployedWorkersCountAsync();
        Task<IEnumerable<Worker>> GetUnemployedWorkersAsync();
    }
}
