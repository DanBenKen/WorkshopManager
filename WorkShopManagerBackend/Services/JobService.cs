using AutoMapper;
using WorkshopManager.DTOs.JobDTOs;
using WorkshopManager.Exceptions.JobExceptions;
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
            // null object pattern???

            JobDTO? jobCreate = null;

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                var workerFullName = await GetWorkerFullNameAsync(createJob.WorkerId);

                jobCreate = _mapper.Map<JobDTO>(createJob);
                jobCreate.WorkerName = workerFullName;

                await _unitOfWork.JobRepository.AddJobAsync(jobCreate);
            });

            if (jobCreate is null)
                throw new JobCreationNullException();

            return jobCreate;
        }

        public async Task<JobDTO> UpdateJobAsync(int id, RequestUpdateJobDTO updateJob)
        {
            JobDTO? jobUpdate = null;

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                var workerFullName = await GetWorkerFullNameAsync(updateJob.WorkerId);

                jobUpdate = _mapper.Map<JobDTO>(updateJob);
                jobUpdate.WorkerName = workerFullName;

                _unitOfWork.JobRepository.UpdateJob(id, jobUpdate);
            });

            if (jobUpdate is null)
                throw new JobUpdateNullException();

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
            JobDTO? getJob = null;

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                var job = await _unitOfWork.JobRepository.GetJobByIdAsync(id)
                                ?? throw new JobNotFoundException(id);

                var workerFullName = await GetWorkerFullNameAsync(job.WorkerId);

                getJob = _mapper.Map<JobDTO>(job);
                getJob.WorkerName = workerFullName;
            });

            if (getJob is null)
                throw new JobGetNullException();

            return getJob;
        }

        public async Task<IEnumerable<JobDTO>> GetAllJobs()
        {
            var jobs = await _unitOfWork.JobRepository.GetAllJobsAsync();

            var jobDtos = _mapper.Map<IEnumerable<JobDTO>>(jobs);

            return jobDtos;
        }

        private async Task<string> GetWorkerFullNameAsync(int workerId)
        {
            var worker = await _unitOfWork.WorkerRepository.GetWorkerByIdAsync(workerId)
                ?? throw new WorkerNotFoundException(workerId);
            return worker.FullName;
        }
    }
}
