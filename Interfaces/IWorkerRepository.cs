using WorkshopManager.Models;

namespace WorkshopManager.Interfaces
{
    public interface IWorkerRepository
    {
        Task<Worker> GetWorkerByIdAsync(int id);
    }
}
