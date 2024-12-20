using Microsoft.EntityFrameworkCore;
using WorkshopManager.Models;

namespace WorkshopManager.Interfaces.RepositoryInterfaces
{
    public interface IWorkerRepository
    {
        Task<Worker> GetWorkerByIdAsync(int id);
        public Worker AddWorker(Worker worker);
        public Worker UpdateWorker(Worker worker);
        public Worker DeleteWorker(Worker worker);
    }
}
