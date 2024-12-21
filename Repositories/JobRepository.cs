using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WorkshopManager.DTOs.JobDTOs;
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
            return await _context.Jobs.FirstOrDefaultAsync(j => j.Id == id);
        }

        public async Task<IEnumerable<Job>> GetJobsByWorkerIdAsync(int workerId)
        {
            return await _context.Jobs
                .Where(j => j.WorkerId == workerId)
                .ToListAsync();
        }

        public Job AddJob(JobDTO jobDTO, string workerName)
        {
            var job = _mapper.Map<Job>(jobDTO);

            _context.Jobs.Add(job);
            return job;
        }

        public Job UpdateJob(int id, JobDTO jobDTO)
        {
            var job = _mapper.Map<Job>(jobDTO);
            job.Id = id;

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
