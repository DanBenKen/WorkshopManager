using Microsoft.EntityFrameworkCore;
using WorkshopManager.Interfaces.RepositoryInterfaces;
using WorkshopManager.Models;

namespace WorkshopManager.Repositories
{
    public class WorkerRepository : IWorkerRepository
    {
        private readonly WorkshopDbContext _context;

        public WorkerRepository(WorkshopDbContext context)
        {
            _context = context;
        }

        public async Task<Worker> GetWorkerByIdAsync(int id)
        {
            return await _context.Workers.FirstOrDefaultAsync(w => w.Id == id);
        }

        public Worker AddWorker(Worker worker)
        {
            _context.AddAsync(worker);
            return worker;
        }

        public Worker UpdateWorker(Worker worker)
        {
            _context.Update(worker);
            return worker;
        }

        public Worker DeleteWorker(Worker worker) 
        {
            _context.Workers.Remove(worker);
            return worker;
        }
    }
}
