using WorkshopManager.DTOs.WorkerDTOs;
using WorkshopManager.Models;

namespace WorkshopManager.Interfaces.RepositoryInterfaces
{
    public interface IWorkerRepository
    {
        Task<Worker?> GetWorkerByIdAsync(int id);
        Task<IEnumerable<Worker>> GetAllWorkersAsync();
        Task<IEnumerable<Worker>> GetAllWorkersWithJobsAsync();
        Task<Worker> AddWorkerAsync(WorkerDTO workerDTO);
        Task UpdateWorkerAsync(int id, WorkerDTO workerDTO);
        Task<int> GetWorkersCountAsync();
        bool DeleteWorker(Worker worker);
        Task<int> GetUnemployedWorkersCountAsync();
        Task<IEnumerable<Worker>> GetWorkersWithoutJobsAsync();
    }
}
