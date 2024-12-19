using WorkshopManager.Models;

namespace WorkshopManager.Interfaces
{
    public interface IWorkerService
    {
        Task<Worker> GetWorkerAsync(int id);
    }
}
