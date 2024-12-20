using WorkshopManager.DTOs;
using WorkshopManager.Interfaces;
using WorkshopManager.Interfaces.ServiceInterfaces;
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
            var worker = await _unitOfWork.WorkerRepository.GetWorkerByIdAsync(jobDTO.WorkerId);

            var job = new Job
            {
                WorkerId = jobDTO.WorkerId,
                JobName = jobDTO.JobName,
                Description = jobDTO.Description,
                Status = jobDTO.Status,
                WorkerName = $"{worker.FirstName} {worker.LastName}",
            };

            _unitOfWork.JobRepository.AddJob(job);
            await _unitOfWork.SaveChangesAsync();

            return job;
        }

        public async Task<Job> GetJobAsync(int id)
        {
            return await _unitOfWork.JobRepository.GetJobByIdAsync(id);
        }
    }
}
