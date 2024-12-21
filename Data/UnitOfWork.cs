using AutoMapper;
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
        private IMapper _mapper;

        public UnitOfWork(WorkshopDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

            _jobRepository = new JobRepository(_context, _mapper);
            _workerRepository = new WorkerRepository(_context);
            _supplyRepository = new SupplyRepository(_context);
        }

        public IJobRepository JobRepository => _jobRepository ??= new JobRepository(_context, _mapper);
        public IWorkerRepository WorkerRepository => _workerRepository ??= new WorkerRepository(_context);
        public ISupplyRepository SupplyRepository => _supplyRepository ??= new SupplyRepository(_context);

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose() => _context.Dispose();
    }
}
