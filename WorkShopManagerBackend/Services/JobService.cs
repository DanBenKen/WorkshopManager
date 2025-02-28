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

        public async Task<JobDTO> CreateJobAsync(RequestCreateJobDTO createJobDTO)
        {
            var jobEntity = _mapper.Map<Job>(createJobDTO);

            await ValidateRelatedEntities(jobEntity);

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await _unitOfWork.JobRepository.AddJobAsync(jobEntity);
            });

            return await GetJobWithDetailsAsync(jobEntity.Id);
        }

        public async Task<JobDTO> UpdateJobAsync(int id, RequestUpdateJobDTO updateJobDTO)
        {
            var existingJob = await _unitOfWork.JobRepository.GetJobByIdAsync(id)
                ?? throw new JobNotFoundException(id);

            _mapper.Map(updateJobDTO, existingJob);
            await ValidateRelatedEntities(existingJob);

            await _unitOfWork.ExecuteInTransactionAsync(() =>
            {
                _unitOfWork.JobRepository.UpdateJob(existingJob);
                return Task.CompletedTask;
            });

            return await GetJobWithDetailsAsync(id);
        }

        public async Task DeleteJobAsync(int id)
        {
            var job = await _unitOfWork.JobRepository.GetJobByIdAsync(id)
                ?? throw new JobNotFoundException(id);

            await _unitOfWork.ExecuteInTransactionAsync(() =>
            {
                _unitOfWork.JobRepository.DeleteJob(job);
                return Task.CompletedTask;
            });
        }

        public async Task<JobDTO> GetJobAsync(int id)
        {
            var job = await _unitOfWork.JobRepository.GetJobByIdAsync(id)
                ?? throw new JobNotFoundException(id);

            return _mapper.Map<JobDTO>(job);
        }

        public async Task<IEnumerable<JobDTO>> GetAllJobsAsync()
        {
            var jobs = await _unitOfWork.JobRepository.GetAllJobsAsync();
            return _mapper.Map<IEnumerable<JobDTO>>(jobs);
        }

        private async Task ValidateRelatedEntities(Job job)
        {
            if (job.WorkerId.HasValue && !await _unitOfWork.WorkerRepository.ExistsAsync(job.WorkerId.Value))
                throw new WorkerNotFoundException(job.WorkerId.Value);

            if (job.SupplyId.HasValue && !await _unitOfWork.SupplyRepository.ExistsAsync(job.SupplyId.Value))
                throw new SupplyNotFoundException(job.SupplyId.Value);
        }

        private async Task<JobDTO> GetJobWithDetailsAsync(int id)
        {
            var job = await _unitOfWork.JobRepository.GetJobWithDetailsAsync(id)
                ?? throw new JobNotFoundException(id);

            return _mapper.Map<JobDTO>(job);
        }
    }
}