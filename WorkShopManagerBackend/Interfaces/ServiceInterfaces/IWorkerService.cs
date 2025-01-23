using WorkshopManager.DTOs.WorkerDTOs;
using WorkshopManager.Models;

namespace WorkshopManager.Interfaces.ServiceInterfaces
{
    public interface IWorkerService
    {
        Task<WorkerDTO> CreateWorkerAsync(RequestCreateWorkerDTO createWorkerDTO);
        Task<WorkerDTO> GetWorkerAsync(int id);
        Task<IEnumerable<WorkerDTO>> GetAllWorkersAsync();
        Task<IEnumerable<WorkerWithJobDTO>> GetAllWorkersWithJobsAsync();
        Task<WorkerDTO> UpdateWorkerAsync(int id, RequestUpdateWorkerDTO workerUpdateDTO);
        Task<bool> DeleteWorkerAsync(int id);
    }
}
