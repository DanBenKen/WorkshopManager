using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WorkshopManager.Exceptions.JobExceptions;
using WorkshopManager.Interfaces.RepositoryInterfaces;
using WorkshopManager.Models;

namespace WorkshopManager.Repositories
{
    public class JobRepository(WorkshopDbContext context, IMapper mapper) : IJobRepository
    {
        private readonly WorkshopDbContext _context = context;
        private readonly IMapper _mapper = mapper;

        public async Task<Job?> GetJobByIdAsync(int id)
        {
            return await _context.Jobs.Include(j => j.Worker).Include(j => j.Supply).FirstOrDefaultAsync(j => j.Id == id);
        }

        public async Task<IEnumerable<Job>> GetAllJobsAsync()
        {
            return await _context.Jobs.Include(j => j.Worker).Include(j => j.Supply).AsNoTracking().ToListAsync();
        }

        public async Task<Job> AddJobAsync(Job job)
        {
            await _context.Jobs.AddAsync(job);
            return job;
        }

        public async Task UpdateJobAsync(int id, Job existingJob)
        {
            var job = await _context.Jobs.FindAsync(id)
                ?? throw new JobNotFoundException(id);

            _mapper.Map(existingJob, job);
            _context.Jobs.Update(job);
        }

        public bool DeleteJob(Job job)
        {
            _context.Jobs.Remove(job);
            return true;
        }
    }
}
