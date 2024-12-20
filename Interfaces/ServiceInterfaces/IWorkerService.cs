using WorkshopManager.DTOs;
using WorkshopManager.Models;

namespace WorkshopManager.Interfaces.ServiceInterfaces
{
    public interface IWorkerService
    {
        Task<Worker> CreateWorker(WorkerDTO workerDto);
        Task<Worker?> GetWorkerAsync(int id);
        Task<Worker?> UpdateWorkerAsync(int id, WorkerDTO workerDTO);
        Task DeleteWorkerAsync(int id);
    }
}
