﻿using Microsoft.EntityFrameworkCore;
using WorkshopManager.Interfaces;
using WorkshopManager.Models;

namespace WorkshopManager.Repositories
{
    public class WorkerRepository : IWorkerRepository
    {
        private readonly WorkshopDbContext _context;

        public WorkerRepository(WorkshopDbContext context)
        {
            _context = context;
        }
        public async Task<Worker> GetWorkerByIdAsync(int id)
        {
            return await _context.Workers.FirstOrDefaultAsync(w => w.Id == id);
        }
    }
}
