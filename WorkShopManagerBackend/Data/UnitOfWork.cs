using AutoMapper;
using WorkshopManager.Interfaces;
using WorkshopManager.Interfaces.RepositoryInterfaces;

namespace WorkshopManager.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly WorkshopDbContext _context;
        private readonly IMapper _mapper;

        private readonly IJobRepository _jobRepository;
        private readonly IWorkerRepository _workerRepository;
        private readonly ISupplyRepository _supplyRepository;

        public IJobRepository JobRepository => _jobRepository;
        public IWorkerRepository WorkerRepository => _workerRepository;
        public ISupplyRepository SupplyRepository => _supplyRepository;

        public UnitOfWork(WorkshopDbContext context,
            IMapper mapper,
            IJobRepository jobRepository,
            IWorkerRepository workerRepository,
            ISupplyRepository supplyRepository)
        {
            _context = context;
            _mapper = mapper;

            _jobRepository = jobRepository ?? throw new ArgumentNullException(nameof(jobRepository));
            _workerRepository = workerRepository ?? throw new ArgumentNullException(nameof(workerRepository));
            _supplyRepository = supplyRepository ?? throw new ArgumentNullException(nameof(supplyRepository));
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose() => _context.Dispose();

        public async Task ExecuteInTransactionAsync(Func<Task> action)
        {
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    await action();
                    await _context.SaveChangesAsync();
                    await transaction.CommitAsync();
                }
                catch (Exception)
                {
                    await transaction.RollbackAsync();
                    throw;
                }
            }
        }
    }
}
