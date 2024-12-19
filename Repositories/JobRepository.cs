using Microsoft.EntityFrameworkCore;
using WorkshopManager.Interfaces;
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

        public async Task<Job> GetJobByIdAsync(int id)
        {
            return await _context.Jobs.FirstOrDefaultAsync(j => j.Id == id);
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

        public void DeleteJob(int id)
        {
            var job = _context.Jobs.Find(id);
            if (job != null)
            {
                _context.Jobs.Remove(job);
            }
        }
    }
}
