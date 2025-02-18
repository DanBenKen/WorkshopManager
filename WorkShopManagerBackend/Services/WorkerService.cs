using AutoMapper;
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
            var worker = _mapper.Map<Worker>(createWorkerDTO);

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await _unitOfWork.WorkerRepository.AddWorkerAsync(worker);
            });

            return _mapper.Map<WorkerDTO>(worker);
        }

        public async Task<WorkerDTO> GetWorkerAsync(int id)
        {
            var worker = await _unitOfWork.WorkerRepository.GetWorkerByIdAsync(id)
                ?? throw new WorkerNotFoundException(id);

            return _mapper.Map<WorkerDTO>(worker);
        }

        public async Task<WorkerDTO> UpdateWorkerAsync(int id, RequestUpdateWorkerDTO workerUpdateDTO)
        {
            var existingWorker = await _unitOfWork.WorkerRepository.GetWorkerByIdAsync(id)
                ?? throw new WorkerNotFoundException(id);

            _mapper.Map(workerUpdateDTO, existingWorker);

            await _unitOfWork.ExecuteInTransactionAsync(() =>
            {
                _unitOfWork.WorkerRepository.UpdateWorker(existingWorker);
                return Task.CompletedTask;
            });

            return _mapper.Map<WorkerDTO>(existingWorker);
        }

        public async Task DeleteWorkerAsync(int id)
        {
            var worker = await _unitOfWork.WorkerRepository.GetWorkerByIdAsync(id)
                ?? throw new WorkerNotFoundException(id);

            await _unitOfWork.ExecuteInTransactionAsync(() =>
            {
                _unitOfWork.WorkerRepository.DeleteWorker(worker);
                return Task.CompletedTask;
            });
        }

        public async Task<IEnumerable<WorkerDTO>> GetAllWorkersAsync()
        {
            var workers = await _unitOfWork.WorkerRepository.GetAllWorkersAsync();
            return _mapper.Map<IEnumerable<WorkerDTO>>(workers);
        }

        public async Task<IEnumerable<WorkerWithJobDTO>> GetAllWorkersWithJobsAsync()
        {
            var workers = await _unitOfWork.WorkerRepository.GetAllWorkersWithJobsAsync();
            return _mapper.Map<IEnumerable<WorkerWithJobDTO>>(workers);
        }

        public async Task<IEnumerable<WorkerDTO>> GetWorkersWithoutJobsAsync()
        {
            var workers = await _unitOfWork.WorkerRepository.GetUnemployedWorkersAsync();
            return _mapper.Map<IEnumerable<WorkerDTO>>(workers);
        }

        public async Task<int> GetWorkersCountAsync()
        {
            return await _unitOfWork.WorkerRepository.GetWorkersCountAsync();
        }

        public async Task<int> GetUnemployedWorkersCountAsync()
        {
            return await _unitOfWork.WorkerRepository.GetUnemployedWorkersCountAsync();
        }
    }
}
