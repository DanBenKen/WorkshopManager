using WorkshopManager.Interfaces.RepositoryInterfaces;

namespace WorkshopManager.Repositories
{
    public class SupplyRepository : ISupplyRepository
    {
        private readonly WorkshopDbContext _context;

        public SupplyRepository(WorkshopDbContext context)
        {
            _context = context;
        }
    }
}
