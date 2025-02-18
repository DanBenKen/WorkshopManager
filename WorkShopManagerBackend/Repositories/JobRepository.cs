using Microsoft.EntityFrameworkCore;
using WorkshopManager.Interfaces.RepositoryInterfaces;
using WorkshopManager.Models;

namespace WorkshopManager.Repositories
{
    public class JobRepository : IJobRepository
    {
        private readonly WorkshopDbContext _context;

        public JobRepository(WorkshopDbContext context)
        {
            _context = context;
        }

        public async Task<Job?> GetJobByIdAsync(int id)
        {
            return await _context.Jobs.Include(j => j.Worker).Include(j => j.Supply).FirstOrDefaultAsync(j => j.Id == id);
        }

        public async Task<Job?> GetJobWithDetailsAsync(int id)
        {
            return await _context.Jobs.AsNoTracking().Include(j => j.Worker).Include(j => j.Supply).FirstOrDefaultAsync(j => j.Id == id);
        }

        public async Task<IEnumerable<Job>> GetAllJobsAsync()
        {
            return await _context.Jobs.AsNoTracking().Include(j => j.Worker).Include(j => j.Supply).ToListAsync();
        }

        public async Task AddJobAsync(Job job)
        {
            await _context.Jobs.AddAsync(job);
        }

        public void UpdateJob(Job job)
        {
            _context.Jobs.Update(job);
        }

        public void DeleteJob(Job job)
        {
            _context.Jobs.Remove(job);
        }
    }
}