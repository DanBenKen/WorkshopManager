using AutoMapper;
using WorkshopManager.DTOs.JobDTOs;
using WorkshopManager.DTOs.WorkerDTOs;
using WorkshopManager.Exceptions;
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
            var worker = _mapper.Map<WorkerDTO>(createWorkerDTO);

            _unitOfWork.WorkerRepository.AddWorker(worker);
            await _unitOfWork.SaveChangesAsync();

            return worker;
        }

        public async Task<Worker?> GetWorkerAsync(int id)
        {
            return await _unitOfWork.WorkerRepository.GetWorkerByIdAsync(id)
                ?? throw new WorkerNotFoundException(id);
        }

        public async Task<IEnumerable<Worker>> GetAllWorkersAsync()
        {
            return await _unitOfWork.WorkerRepository.GetAllWorkersAsync();
        }

        public async Task<IEnumerable<WorkerWithJobDTO>> GetAllWorkersWithJobsAsync()
        {
            var workers = await _unitOfWork.WorkerRepository.GetAllWorkersAsync();

            var workersWithJobs = new List<WorkerWithJobDTO>();

            foreach (var worker in workers)
            {
                var jobs = await _unitOfWork.JobRepository.GetJobsByWorkerIdAsync(worker.Id);

                workersWithJobs = workers.Select(worker => new WorkerWithJobDTO
                {
                    WorkerId = worker.Id,
                    WorkerName = $"{worker.FullName}",
                    Jobs = jobs
                            .Where(j => j.WorkerId == worker.Id)
                            .Select(j => _mapper.Map<JobDTO>(j))
                            .ToList()
                }).ToList();
            }

            return workersWithJobs;
        }

        public async Task<WorkerDTO> UpdateWorkerAsync(int id, RequestUpdateWorkerDTO workerUpdateDTO)
        {
            var workerDTO = _mapper.Map<WorkerDTO>(workerUpdateDTO);

            _unitOfWork.WorkerRepository.UpdateWorker(id, workerDTO);
            await _unitOfWork.SaveChangesAsync();

            return workerDTO;
        }

        public async Task<bool> DeleteWorkerAsync(int id)
        {
            var worker = await _unitOfWork.WorkerRepository.GetWorkerByIdAsync(id)
                ?? throw new WorkerNotFoundException(id);

            var isDeleted = _unitOfWork.WorkerRepository.DeleteWorker(worker);
            if (isDeleted)
            {
                await _unitOfWork.SaveChangesAsync();
                return true;
            }

            return false;
        }
    }
}
