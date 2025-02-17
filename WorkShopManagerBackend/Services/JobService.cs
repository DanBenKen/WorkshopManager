using AutoMapper;
using WorkshopManager.DTOs.JobDTOs;
using WorkshopManager.Exceptions.JobExceptions;
using WorkshopManager.Exceptions.SupplyExceptions;
using WorkshopManager.Exceptions.WorkerExceptions;
using WorkshopManager.Interfaces;
using WorkshopManager.Interfaces.ServiceInterfaces;
using WorkshopManager.Models;

namespace WorkshopManager.Services
{
    public class JobService : IJobService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public JobService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<JobDTO> CreateJobAsync(RequestCreateJobDTO createJob)
        {
            var worker = await _unitOfWork.WorkerRepository.GetWorkerByIdAsync(createJob.WorkerId)
                ?? throw new WorkerNotFoundException(createJob.WorkerId);

            var supply = await _unitOfWork.SupplyRepository.GetSupplyByIdAsync(createJob.SupplyId)
                ?? throw new SupplyNotFoundException(createJob.SupplyId);

            var jobEntity = _mapper.Map<Job>(createJob);

            jobEntity.WorkerId = worker.Id;
            jobEntity.SupplyId = supply.Id;

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await _unitOfWork.JobRepository.AddJobAsync(jobEntity);
            });

            return _mapper.Map<JobDTO>(jobEntity);
        }

        public async Task<JobDTO> UpdateJobAsync(int id, RequestUpdateJobDTO updateJob)
        {
            var existingJob = await _unitOfWork.JobRepository.GetJobByIdAsync(id)
                ?? throw new JobNotFoundException(id);

            _mapper.Map(updateJob, existingJob);

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await _unitOfWork.JobRepository.UpdateJobAsync(id, existingJob);
            });

            return _mapper.Map<JobDTO>(existingJob);
        }

        public async Task<bool> DeleteJobAsync(int id)
        {
            bool isDeleted = false;

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                var job = await _unitOfWork.JobRepository.GetJobByIdAsync(id)
                    ?? throw new JobNotFoundException(id);

                isDeleted = _unitOfWork.JobRepository.DeleteJob(job);
            });

            return isDeleted;
        }

        public async Task<JobDTO> GetJobAsync(int id)
        {
            var job = await _unitOfWork.JobRepository.GetJobByIdAsync(id)
                            ?? throw new JobNotFoundException(id);

            var getJob = _mapper.Map<JobDTO>(job);
            getJob.WorkerName = job.Worker?.FullName;

            if (job.SupplyId.HasValue)
            {
                getJob.SupplyName = job.Supply?.Name;
            }

            return getJob;
        }

        public async Task<IEnumerable<JobDTO>> GetAllJobs()
        {
            var jobs = await _unitOfWork.JobRepository.GetAllJobsAsync();
            return _mapper.Map<IEnumerable<JobDTO>>(jobs);
        }

        private async Task<string> GetWorkerFullNameAsync(int workerId)
        {
            var worker = await _unitOfWork.WorkerRepository.GetWorkerByIdAsync(workerId)
                ?? throw new WorkerNotFoundException(workerId);

            return worker.FullName;
        }
    }
}
