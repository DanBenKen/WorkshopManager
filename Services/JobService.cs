using WorkshopManager.DTOs;
using WorkshopManager.Exceptions;
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
            var worker = await _unitOfWork.WorkerRepository.GetWorkerByIdAsync(jobDTO.WorkerId)
                ?? throw new WorkerNotFoundException(jobDTO.WorkerId);

            var supply = await _unitOfWork.SupplyRepository.GetSupplyByIdAsync(jobDTO.SupplyId)
                ?? throw new SupplyNotFoundException(jobDTO.SupplyId);

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
            var job = await _unitOfWork.JobRepository.GetJobByIdAsync(id)
                ?? throw new JobNotFoundException(id);

            var worker = await _unitOfWork.WorkerRepository.GetWorkerByIdAsync(jobDTO.WorkerId)
                ?? throw new WorkerNotFoundException(jobDTO.WorkerId);

            job.WorkerId = jobDTO.WorkerId;
            job.JobName = jobDTO.JobName;
            job.Description = jobDTO.Description;
            job.Status = jobDTO.Status;
            job.WorkerName = $"{worker?.FirstName} {worker?.LastName}";

            _unitOfWork.JobRepository.UpdateJob(job);
            await _unitOfWork.SaveChangesAsync();

            return job;
        }

        public async Task DeleteJobAsync(int id)
        {
            var job = await _unitOfWork.JobRepository.GetJobByIdAsync(id)
                ?? throw new JobNotFoundException(id);

            _unitOfWork.JobRepository.DeleteJob(job);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<Job?> GetJobAsync(int id)
        {
            return await _unitOfWork.JobRepository.GetJobByIdAsync(id);
        }
    }
}
