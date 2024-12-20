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

        public async Task AddAsync(Worker worker)
        {
            await _context.AddAsync(worker);
        }
    }
}
