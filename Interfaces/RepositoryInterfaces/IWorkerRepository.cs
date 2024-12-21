using WorkshopManager.DTOs.WorkerDTOs;
using WorkshopManager.Models;

namespace WorkshopManager.Interfaces.RepositoryInterfaces
{
    public interface IWorkerRepository
    {
        Task<Worker?> GetWorkerByIdAsync(int id);
        Task<IEnumerable<Worker>> GetAllWorkersAsync();
        Worker AddWorker(WorkerDTO createWorker);
        Worker UpdateWorker(int id, WorkerDTO workerDTO);
        bool DeleteWorker(Worker worker);
    }
}
