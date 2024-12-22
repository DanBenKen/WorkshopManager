using AutoMapper;
using WorkshopManager.DTOs.JobDTOs;
using WorkshopManager.Exceptions;
using WorkshopManager.Interfaces;
using WorkshopManager.Interfaces.ServiceInterfaces;

namespace WorkshopManager.Services
{
    public class JobService(IUnitOfWork unitOfWork, IMapper mapper) : IJobService
    {
        private readonly IUnitOfWork _unitOfWork = unitOfWork;
        private readonly IMapper _mapper = mapper;

        public async Task<JobDTO> CreateJobAsync(RequestCreateJobDTO createJob)
        {
            var worker = await _unitOfWork.WorkerRepository.GetWorkerByIdAsync(createJob.WorkerId)
                ?? throw new WorkerNotFoundException(createJob.WorkerId);
            var workerFullName = worker.FullName;

            var jobCreate = _mapper.Map<JobDTO>(createJob);
            jobCreate.WorkerName = workerFullName;

            await _unitOfWork.JobRepository.AddJobAsync(jobCreate);
            await _unitOfWork.SaveChangesAsync();

            return jobCreate;
        }

        public async Task<JobDTO> UpdateJobAsync(int id, RequestUpdateJobDTO updateJob)
        {
            var worker = await _unitOfWork.WorkerRepository.GetWorkerByIdAsync(updateJob.WorkerId)
                ?? throw new WorkerNotFoundException(updateJob.WorkerId);
            var workerFullName = worker.FullName;

            var jobUpdate = _mapper.Map<JobDTO>(updateJob);
            jobUpdate.WorkerName = workerFullName;

            _unitOfWork.JobRepository.UpdateJob(id, jobUpdate);
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

            var getJob = _mapper.Map<JobDTO>(job);

            return getJob;
        }
    }
}
