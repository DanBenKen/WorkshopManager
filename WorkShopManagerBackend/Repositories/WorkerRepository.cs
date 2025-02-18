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

        public async Task<Worker?> GetWorkerByIdAsync(int id)
        {
            return await _context.Workers.FirstOrDefaultAsync(w => w.Id == id);
        }

        public async Task<IEnumerable<Worker>> GetAllWorkersAsync()
        {
            return await _context.Workers.AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<Worker>> GetAllWorkersWithJobsAsync()
        {
            return await _context.Workers.AsNoTracking().Include(w => w.Jobs).Where(w => w.Jobs.Any()).ToListAsync();
        }

        public async Task<int> GetWorkersCountAsync()
        {
            return await _context.Workers.CountAsync();
        }

        public async Task<int> GetUnemployedWorkersCountAsync()
        {
            return await _context.Workers.CountAsync(w => !w.Jobs.Any());
        }

        public async Task<IEnumerable<Worker>> GetUnemployedWorkersAsync()
        {
            return await _context.Workers.AsNoTracking().Where(w => !w.Jobs.Any()).ToListAsync();
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.Workers.AnyAsync(w => w.Id == id);
        }

        public async Task AddWorkerAsync(Worker worker)
        {
            await _context.Workers.AddAsync(worker);
        }

        public void UpdateWorker(Worker worker)
        {
            _context.Workers.Update(worker);
        }

        public void DeleteWorker(Worker worker)
        {
            _context.Workers.Remove(worker);
        }
    }
}