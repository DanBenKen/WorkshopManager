using WorkshopManager.DTOs;
using WorkshopManager.Exceptions;
using WorkshopManager.Interfaces;
using WorkshopManager.Interfaces.ServiceInterfaces;
using WorkshopManager.Models;

namespace WorkshopManager.Services
{
    public class WorkerService : IWorkerService
    {
        private readonly IUnitOfWork _unitOfWork;

        public WorkerService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Worker> CreateWorkerAsync(WorkerDTO workerDto)
        {
            var worker = new Worker
            {
                FirstName = workerDto.FirstName,
                LastName = workerDto.LastName,
                Position = workerDto.Position,
            };

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

                workersWithJobs.Add(new WorkerWithJobDTO
                {
                    WorkerId = worker.Id,
                    WorkerName = $"{worker.FirstName} {worker.LastName}",
                    Jobs = jobs.Select(j => new JobDTO
                    {
                        WorkerId = j.WorkerId,
                        SupplyId = j.SupplyId,
                        JobName = j.JobName,
                        Description = j.Description,
                        Status = j.Status
                    }).ToList()
                });
            }

            return workersWithJobs;
        }

        public async Task<Worker?> UpdateWorkerAsync(int id, WorkerDTO workerDTO)
        {
            var worker = await _unitOfWork.WorkerRepository.GetWorkerByIdAsync(id)
                ?? throw new WorkerNotFoundException(id);

            worker.FirstName = workerDTO.FirstName;
            worker.LastName = workerDTO.LastName;
            worker.Position = workerDTO.Position;

            _unitOfWork.WorkerRepository.UpdateWorker(worker);
            await _unitOfWork.SaveChangesAsync();

            return worker;
        }

        public async Task DeleteWorkerAsync(int id)
        {
            var worker = await _unitOfWork.WorkerRepository.GetWorkerByIdAsync(id)
                ?? throw new WorkerNotFoundException(id);

            _unitOfWork.WorkerRepository.DeleteWorker(worker);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}
