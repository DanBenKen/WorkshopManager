using AutoMapper;
using WorkshopManager.DTOs.JobDTOs;
using WorkshopManager.DTOs.WorkerDTOs;
using WorkshopManager.Exceptions.WorkerExceptions;
using WorkshopManager.Interfaces;
using WorkshopManager.Interfaces.ServiceInterfaces;

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
            var workerDTO = _mapper.Map<WorkerDTO>(createWorkerDTO);

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await _unitOfWork.WorkerRepository.AddWorkerAsync(workerDTO);
            });

            return workerDTO;
        }

        public async Task<WorkerDTO> GetWorkerAsync(int id)
        {
            var worker = await _unitOfWork.WorkerRepository.GetWorkerByIdAsync(id)
                ?? throw new WorkerNotFoundException(id);

            return _mapper.Map<WorkerDTO>(worker);
        }

        public async Task<IEnumerable<WorkerDTO>> GetAllWorkersAsync()
        {
            var workers = await _unitOfWork.WorkerRepository.GetAllWorkersAsync();

            return _mapper.Map<IEnumerable<WorkerDTO>>(workers);
        }

        public async Task<IEnumerable<WorkerWithJobDTO>> GetAllWorkersWithJobsAsync()
        {
            var workers = await _unitOfWork.WorkerRepository.GetAllWorkersWithJobsAsync();

            var workersWithJobs = _mapper.Map<IEnumerable<WorkerWithJobDTO>>(workers);

            return workersWithJobs;
        }

        public async Task<WorkerDTO> UpdateWorkerAsync(int id, RequestUpdateWorkerDTO workerUpdateDTO)
        {
            var workerDTO = _mapper.Map<WorkerDTO>(workerUpdateDTO);

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await _unitOfWork.WorkerRepository.UpdateWorkerAsync(id, workerDTO);
            });

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

        public async Task<int> GetWorkersCountAsync()
        {
            return await _unitOfWork.WorkerRepository.GetWorkersCountAsync();
        }

        public async Task<int> GetUnemployedWorkersCountAsync()
        {
            return await _unitOfWork.WorkerRepository.GetUnemployedWorkersCountAsync();
        }

        public async Task<IEnumerable<WorkerDTO>> GetWorkersWithoutJobsAsync()
        {
            var workers = await _unitOfWork.WorkerRepository.GetWorkersWithoutJobsAsync();
            return _mapper.Map<IEnumerable<WorkerDTO>>(workers);
        }
    }
}