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
            var newJob = _mapper.Map<Job>(createJobDTO);

            await ValidateWorkerAndSupplyAsync(newJob);

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await AdjustSupplyQuantity(newJob.SupplyId, -newJob.SupplyQuantity);
                await _unitOfWork.JobRepository.AddJobAsync(newJob);
            });

            return await GetJobWithDetailsAsync(newJob.Id);
        }

        public async Task<JobDTO> UpdateJobAsync(int id, RequestUpdateJobDTO updateJobDTO)
        {
            var existingJob = await _unitOfWork.JobRepository.GetJobByIdAsync(id)
                ?? throw new JobNotFoundException(id);

            var originalSupplyId = existingJob.SupplyId;
            var originalSupplyQuantity = existingJob.SupplyQuantity;

            _mapper.Map(updateJobDTO, existingJob);

            await ValidateWorkerAndSupplyAsync(existingJob);

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await HandleSupplyAdjustmentsAsync(originalSupplyId, originalSupplyQuantity, updateJobDTO);
                _unitOfWork.JobRepository.UpdateJob(existingJob);
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

        private async Task<JobDTO> GetJobWithDetailsAsync(int id)
        {
            var job = await _unitOfWork.JobRepository.GetJobWithDetailsAsync(id)
                ?? throw new JobNotFoundException(id);

            return _mapper.Map<JobDTO>(job);
        }

        private async Task ValidateWorkerAndSupplyAsync(Job job)
        {
            var isWorkerIdValid = await _unitOfWork.WorkerRepository.GetWorkerByIdAsync(job.WorkerId)
                ?? throw new WorkerNotFoundException(job.WorkerId);

            var isSupplyIdValid = await _unitOfWork.SupplyRepository.GetSupplyByIdAsync(job.SupplyId)
                ?? throw new SupplyNotFoundException(job.SupplyId);
        }

        private async Task AdjustSupplyQuantity(int supplyId, int quantityChange)
        {
            var supply = await _unitOfWork.SupplyRepository.GetSupplyByIdAsync(supplyId)
                ?? throw new SupplyNotFoundException(supplyId);

            if (supply.Quantity + quantityChange < 0)
                throw new SupplyInsufficientException(supplyId);

            supply.Quantity += quantityChange;

            _unitOfWork.SupplyRepository.UpdateSupply(supply);
        }

        private async Task HandleSupplyAdjustmentsAsync(int? originalSupplyId, int originalSupplyQuantity, RequestUpdateJobDTO updateJobDTO)
        {
            if (originalSupplyId != updateJobDTO.SupplyId)
            {
                await HandleSupplyIdChangeAsync(originalSupplyId, originalSupplyQuantity, updateJobDTO);
            }
            else
            {
                if (originalSupplyQuantity != updateJobDTO.SupplyQuantity)
                {
                    await HandleQuantityChangeAsync(updateJobDTO.SupplyId, originalSupplyQuantity, updateJobDTO.SupplyQuantity);
                }
            }
        }

        private async Task HandleSupplyIdChangeAsync(int? originalSupplyId, int originalSupplyQuantity, RequestUpdateJobDTO updateJobDTO)
        {
            if (originalSupplyId.HasValue)
                await AdjustSupplyQuantity(originalSupplyId.Value, originalSupplyQuantity);

            if (updateJobDTO.SupplyId.HasValue)
                await AdjustSupplyQuantity(updateJobDTO.SupplyId.Value, -updateJobDTO.SupplyQuantity);
        }

        private async Task HandleQuantityChangeAsync(int? supplyId, int originalQuantity, int newQuantity)
        {
            var quantityDifference = newQuantity - originalQuantity;

            if (quantityDifference != 0 && supplyId.HasValue)
                await AdjustSupplyQuantity(supplyId.Value, -quantityDifference);
        }
    }
}