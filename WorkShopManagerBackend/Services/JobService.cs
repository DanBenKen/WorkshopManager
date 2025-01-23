using AutoMapper;
using WorkshopManager.DTOs.JobDTOs;
using WorkshopManager.Exceptions.JobExceptions;
using WorkshopManager.Exceptions.SupplyExceptions;
using WorkshopManager.Exceptions.WorkerExceptions;
using WorkshopManager.Interfaces;
using WorkshopManager.Interfaces.ServiceInterfaces;

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
            ArgumentNullException.ThrowIfNull(createJob);

            var workerExists = await _unitOfWork.WorkerRepository.GetWorkerByIdAsync(createJob.WorkerId)
                ?? throw new WorkerNotFoundException(createJob.WorkerId);

            var supplyExists = await _unitOfWork.SupplyRepository.GetSupplyByIdAsync(createJob.SupplyId)
                ?? throw new SupplyNotFoundException(createJob.SupplyId);

            var jobCreate = _mapper.Map<JobDTO>(createJob);
            jobCreate.WorkerName = await GetWorkerFullNameAsync(createJob.WorkerId);

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await _unitOfWork.JobRepository.AddJobAsync(jobCreate);
            });

            return jobCreate;
        }

        public async Task<JobDTO> UpdateJobAsync(int id, RequestUpdateJobDTO updateJob)
        {
            ArgumentNullException.ThrowIfNull(updateJob);

            var existingJob = await _unitOfWork.JobRepository.GetJobByIdAsync(id)
                ?? throw new JobNotFoundException(id);

            var jobUpdate = _mapper.Map<JobDTO>(updateJob);
            jobUpdate.WorkerName = await GetWorkerFullNameAsync(updateJob.WorkerId);

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await _unitOfWork.JobRepository.UpdateJobAsync(id, jobUpdate);
            });

            return jobUpdate;
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
