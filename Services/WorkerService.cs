using AutoMapper;
using WorkshopManager.DTOs.JobDTOs;
using WorkshopManager.DTOs.WorkerDTOs;
using WorkshopManager.Exceptions.WorkerExceptions;
using WorkshopManager.Interfaces;
using WorkshopManager.Interfaces.ServiceInterfaces;
using WorkshopManager.Models;

namespace WorkshopManager.Services
{
    public class WorkerService : IWorkerService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public WorkerService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<WorkerDTO> CreateWorkerAsync(RequestCreateWorkerDTO createWorkerDTO)
        {
            WorkerDTO? worker = null;

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                worker = _mapper.Map<WorkerDTO>(createWorkerDTO);

                await _unitOfWork.WorkerRepository.AddWorkerAsync(worker);
            });

            if (worker is null)
                throw new WorkerCreateNullException();

            return worker;
        }

        public async Task<WorkerDTO> GetWorkerAsync(int id)
        {
            WorkerDTO? getWorker = null;

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                var worker = await _unitOfWork.WorkerRepository.GetWorkerByIdAsync(id) 
                    ?? throw new WorkerNotFoundException(id);

                getWorker = _mapper.Map<WorkerDTO>(worker);
            });

            if (getWorker is null)
                throw new WorkerGetNullException();

            return getWorker;
        }

        public async Task<IEnumerable<Worker>> GetAllWorkersAsync()
        {
            return await _unitOfWork.WorkerRepository.GetAllWorkersAsync();
        }

        public async Task<IEnumerable<WorkerWithJobDTO>> GetAllWorkersWithJobsAsync()
        {
            IEnumerable<WorkerWithJobDTO>? workersWithJobs = null;

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                var workers = await _unitOfWork.WorkerRepository.GetAllWorkersWithJobsAsync();

                workersWithJobs = workers
                    .Where(w => w.Jobs != null && w.Jobs.Any())
                    .Select(worker => new WorkerWithJobDTO
                    {
                        WorkerId = worker.Id,
                        WorkerName = worker.FullName,
                        Jobs = worker.Jobs.Select(job => _mapper.Map<JobDTO>(job)).ToList()
                    }).ToList();
            });

            if (workersWithJobs is null)
                throw new WorkerGetNullException();

            return workersWithJobs;
        }

        public async Task<WorkerDTO> UpdateWorkerAsync(int id, RequestUpdateWorkerDTO workerUpdateDTO)
        {
            WorkerDTO? workerDTO = null;

            await _unitOfWork.ExecuteInTransactionAsync(() =>
            {
                workerDTO = _mapper.Map<WorkerDTO>(workerUpdateDTO);

                _unitOfWork.WorkerRepository.UpdateWorker(id, workerDTO);
                return Task.CompletedTask;
            });

            if (workerDTO is null)
                throw new WorkerUpdateNullException();

            return workerDTO;
        }

        public async Task<bool> DeleteWorkerAsync(int id)
        {
            bool isDeleted = false;

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                var worker = await _unitOfWork.WorkerRepository.GetWorkerByIdAsync(id)
                    ?? throw new WorkerNotFoundException(id);

                isDeleted = _unitOfWork.WorkerRepository.DeleteWorker(worker);
            });

            return isDeleted;
        }
    }
}
