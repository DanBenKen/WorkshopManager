using Microsoft.EntityFrameworkCore;
using WorkshopManager.Interfaces.RepositoryInterfaces;
using WorkshopManager.Models;

namespace WorkshopManager.Repositories
{
    public class SupplyRepository : ISupplyRepository
    {
        private readonly WorkshopDbContext _context;

        public SupplyRepository(WorkshopDbContext context)
        {
            _context = context;
        }

        public async Task<Supply?> GetSupplyById(int id)
        {
            return await _context.Supplies.FirstOrDefaultAsync(s => s.Id == id);
        }

        public Supply AddSupply(Supply supply)
        {
            _context.Supplies.Add(supply);
            return supply;
        }

        public Supply UpdateSupply(Supply supply)
        {
            _context.Supplies.Update(supply);
            return supply;
        }

        public Supply DeleteSupply(Supply supply)
        {
            _context.Supplies.Remove(supply);
            return supply;
        }
    }
}
