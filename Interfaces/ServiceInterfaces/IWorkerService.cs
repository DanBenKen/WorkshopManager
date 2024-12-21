using WorkshopManager.DTOs.WorkerDTOs;
using WorkshopManager.Models;

namespace WorkshopManager.Interfaces.ServiceInterfaces
{
    public interface IWorkerService
    {
        Task<Worker> CreateWorkerAsync(WorkerDTO workerDto);
        Task<Worker?> GetWorkerAsync(int id);
        Task<IEnumerable<Worker>> GetAllWorkersAsync();
        Task<IEnumerable<WorkerWithJobDTO>> GetAllWorkersWithJobsAsync();
        Task<Worker?> UpdateWorkerAsync(int id, WorkerDTO workerDTO);
        Task DeleteWorkerAsync(int id);
    }
}
