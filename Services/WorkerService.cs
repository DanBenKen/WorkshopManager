using WorkshopManager.DTOs;
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
            if (workerDto == null)
                throw new ArgumentNullException(nameof(workerDto));

            var worker = new Worker
            {
                FirstName = workerDto.FirstName,
                LastName = workerDto.LastName,
                Position = workerDto.Position,
            };

            await _unitOfWork.WorkerRepository.AddAsync(worker);
            await _unitOfWork.SaveChangesAsync();

            return worker;
        }

        public async Task<Worker> GetWorkerAsync(int id)
        {
            return await _unitOfWork.WorkerRepository.GetWorkerByIdAsync(id);
        } 
    }
}
