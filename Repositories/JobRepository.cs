using Microsoft.EntityFrameworkCore;
using WorkshopManager.DTOs;
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

        public Job AddJob(RequestCreateJobDTO createJobDTO, string firstName, string lastName)
        {
            var job = new Job
            {
                WorkerId = createJobDTO.WorkerId,
                SupplyId = createJobDTO.SupplyId,
                JobName = createJobDTO.JobName,
                Description = createJobDTO.Description,
                Status = createJobDTO.Status,
                WorkerName = $"{firstName} {lastName}",
            };

            _context.Jobs.Add(job);
            return job;
        }

        public Job UpdateJob(JobDTO jobDTO)
        {
            var job = new Job
            {
                WorkerId = jobDTO.WorkerId,
                JobName = jobDTO.JobName,
                Description = jobDTO.Description,
                Status = jobDTO.Status,
                WorkerName = $"{jobDTO.WorkerFirstName} {jobDTO.WorkerLastName}",
            };

            _context.Jobs.Update(job);
            return job;
        }

        public bool DeleteJob(Job job)
        {
            _context.Jobs.Remove(job);
            return true;
        }
    }
}
