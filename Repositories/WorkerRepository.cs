using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WorkshopManager.DTOs.WorkerDTOs;
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

        public Worker AddWorker(RequestCreateWorkerDTO createWorker)
        {
            var worker = _mapper.Map<Worker>(createWorker);

            _context.AddAsync(worker);
            return worker;
        }

        public Worker UpdateWorker(Worker worker)
        {
            _context.Update(worker);
            return worker;
        }

        public Worker DeleteWorker(Worker worker) 
        {
            _context.Workers.Remove(worker);
            return worker;
        }
    }
}
