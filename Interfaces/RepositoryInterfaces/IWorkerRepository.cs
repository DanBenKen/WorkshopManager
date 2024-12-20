using Microsoft.EntityFrameworkCore;
using WorkshopManager.Models;

namespace WorkshopManager.Interfaces.RepositoryInterfaces
{
    public interface IWorkerRepository
    {
        Task<Worker> GetWorkerByIdAsync(int id);
        Task AddAsync(Worker worker);
    }
}
