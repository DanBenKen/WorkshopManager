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
            return await _context.Jobs.FirstOrDefaultAsync(j => j.Id == id);
        }

        public async Task<IEnumerable<Job>> GetJobsByWorkerIdAsync(int workerId)
        {
            return await _context.Jobs
                .Where(j => j.WorkerId == workerId)
                .ToListAsync();
        }

        public Job AddJob(Job job)
        {
            _context.Jobs.Add(job);
            return job;
        }

        public Job UpdateJob(Job job)
        {
            _context.Jobs.Update(job);
            return job;
        }

        public Job DeleteJob(Job job)
        {
            _context.Jobs.Remove(job);
            return job;
        }
    }
}
