using WorkshopManager.Interfaces;
using WorkshopManager.Interfaces.RepositoryInterfaces;
using WorkshopManager.Repositories;

namespace WorkshopManager.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly WorkshopDbContext _context;

        private IJobRepository _jobRepository;
        private IWorkerRepository _workerRepository;
        private ISupplyRepository _supplyRepository;

        public IJobRepository JobRepository => _jobRepository ??= new JobRepository(_context);
        public IWorkerRepository WorkerRepository => _workerRepository ??= new WorkerRepository(_context);
        public ISupplyRepository SupplyRepository => _supplyRepository ??= new SupplyRepository(_context);

        public UnitOfWork(WorkshopDbContext context)
        {
            _context = context;
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose() => _context.Dispose();
    }
}
