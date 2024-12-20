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

        public async Task<Worker> CreateWorker(WorkerDTO workerDto)
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
            return await _unitOfWork.WorkerRepository.GetWorkerByIdAsync(id);
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
