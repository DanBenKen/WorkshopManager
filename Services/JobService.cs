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
                SupplyId = jobDTO.SupplyId,
                JobName = jobDTO.JobName,
                Description = jobDTO.Description,
                Status = jobDTO.Status,
                WorkerName = $"{worker?.FirstName} {worker?.LastName}",
            };

            _unitOfWork.JobRepository.AddJob(job);
            await _unitOfWork.SaveChangesAsync();

            return job;
        }

        public async Task<Job?> UpdateJobAsync(int id, JobDTO jobDTO)
        {
            var job = await _unitOfWork.JobRepository.GetJobByIdAsync(id);
            var worker = await _unitOfWork.WorkerRepository.GetWorkerByIdAsync(jobDTO.WorkerId);

            if (job == null)
                throw new Exception("Job not found");

            job.WorkerId = jobDTO.WorkerId;
            job.JobName = jobDTO.JobName;
            job.Description = jobDTO.Description;
            job.Status = jobDTO.Status;
            job.WorkerName = $"{worker?.FirstName} {worker?.LastName}";

            _unitOfWork.JobRepository.UpdateJob(job);
            await _unitOfWork.SaveChangesAsync();

            return job;
        }

        public async Task<bool> DeleteJobAsync(int id)
        {
            var job = await _unitOfWork.JobRepository.GetJobByIdAsync(id);
            if (job == null)
                return false;

            _unitOfWork.JobRepository.DeleteJob(job);
            await _unitOfWork.SaveChangesAsync();

            return true;
        }

        public async Task<Job?> GetJobAsync(int id)
        {
            return await _unitOfWork.JobRepository.GetJobByIdAsync(id);
        }
    }
}
