using WorkshopManager.Interfaces;
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

        public async Task<Worker> GetWorkerAsync(int id)
        {
            return await _unitOfWork.Workers.GetWorkerByIdAsync(id);
        }
    }
}
