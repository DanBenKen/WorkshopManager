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

        public async Task<JobDTO> CreateJobAsync(RequestCreateJobDTO createJob)
        {
            var worker = await _unitOfWork.WorkerRepository.GetWorkerByIdAsync(createJob.WorkerId)
                ?? throw new WorkerNotFoundException(createJob.WorkerId);

            var job = _unitOfWork.JobRepository.AddJob(createJob, worker.FirstName, worker.LastName);
            await _unitOfWork.SaveChangesAsync();

            var result = new JobDTO
            {
                Id = job.Id,
                WorkerId = worker.Id,
                SupplyId = job.Id,
                Description = job.Description,
                JobName = job.JobName,
                Status = job.Status,
                WorkerFirstName = worker.FirstName,
                WorkerLastName = worker.LastName,
            };

            return result;
        }

        public async Task<JobDTO> UpdateJobAsync(int id, RequestUpdateJobDTO updateJob)
        {
            var worker = await _unitOfWork.WorkerRepository.GetWorkerByIdAsync(updateJob.WorkerId)
                ?? throw new WorkerNotFoundException(updateJob.WorkerId);

            var jobUpdate = new JobDTO
            {
                Id = id,
                WorkerId = worker.Id,
                SupplyId = updateJob.SupplyId,
                JobName = updateJob.JobName,
                Status = updateJob.Status,
                WorkerFirstName = worker.FirstName,
                WorkerLastName = worker.LastName,
                Description = updateJob.Description,
            };

            _unitOfWork.JobRepository.UpdateJob(jobUpdate);
            await _unitOfWork.SaveChangesAsync();

            return jobUpdate;
        }

        public async Task<bool> DeleteJobAsync(int id)
        {
            var job = await _unitOfWork.JobRepository.GetJobByIdAsync(id)
                ?? throw new JobNotFoundException(id);

            var isDeleted = _unitOfWork.JobRepository.DeleteJob(job);
            if (isDeleted)
            {
                await _unitOfWork.SaveChangesAsync();
                return true;
            }

            return false;
        }

        public async Task<JobDTO> GetJobAsync(int id)
        {
            var job = await _unitOfWork.JobRepository.GetJobByIdAsync(id)
                ?? throw new JobNotFoundException(id);

            var worker = await _unitOfWork.WorkerRepository.GetWorkerByIdAsync(job.WorkerId)
                ?? throw new WorkerNotFoundException(job.WorkerId);

            var getJob = new JobDTO
            {
                Id = id,
                WorkerId = job.WorkerId,
                SupplyId = job.SupplyId,
                JobName = job.JobName,
                Status = job.Status,
                WorkerFirstName = worker.FirstName,
                WorkerLastName = worker.LastName,
                Description = job.Description,
            };

            return getJob;
        }
    }
}
