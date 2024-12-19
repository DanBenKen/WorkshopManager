using WorkshopManager.DTOs;
using WorkshopManager.Interfaces;
using WorkshopManager.Models;

namespace WorkshopManager.Services
{
    public class JobService : IJobService
    {
        private readonly IUnitOfWork _unitOfWork;

        public JobService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Job> CreateJobAsync(JobDTO jobDTO)
        {
            var job = new Job
            {
                WorkerId = jobDTO.WorkerId,
                JobName = jobDTO.JobName,
                Description = jobDTO.Description,
                Status = jobDTO.Status,
            };

            _unitOfWork.Jobs.AddJob(job);
            await _unitOfWork.CompleteAsync();

            return job;
        }

        public async Task<Job> GetJobAsync(int id)
        {
            return await _unitOfWork.Jobs.GetJobByIdAsync(id);
        }
    }
}
