using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WorkshopManager.DTOs.WorkerDTOs;
using WorkshopManager.Exceptions.WorkerExceptions;
using WorkshopManager.Interfaces.RepositoryInterfaces;
using WorkshopManager.Models;

namespace WorkshopManager.Repositories
{
    public class WorkerRepository : IWorkerRepository
    {
        private readonly WorkshopDbContext _context;
        private readonly IMapper _mapper;

        public WorkerRepository(WorkshopDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Worker?> GetWorkerByIdAsync(int id)
        {
            return await _context.Workers.FirstOrDefaultAsync(w => w.Id == id);
        }

        public async Task<IEnumerable<Worker>> GetAllWorkersAsync()
        {
            return await _context.Workers.ToListAsync();
        }

        public async Task<IEnumerable<Worker>> GetAllWorkersWithJobsAsync()
        {
            return await _context.Workers
                .Include(w => w.Jobs)
                .ToListAsync();
        }

        public async Task<Worker> AddWorkerAsync(WorkerDTO workerDTO)
        {
            var worker = _mapper.Map<Worker>(workerDTO);

            await _context.AddAsync(worker);
            return worker;
        }

        public async Task UpdateWorkerAsync(int id, WorkerDTO workerDTO)
        {
            var worker = await _context.Workers.FindAsync(id)
                ?? throw new WorkerNotFoundException(id);

            _mapper.Map(workerDTO, worker);
            _context.Workers.Update(worker);
        }

        public bool DeleteWorker(Worker worker)
        {
            _context.Workers.Remove(worker);
            return true;
        }
    }
}
