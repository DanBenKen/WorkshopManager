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

        public async Task<IEnumerable<Supply>> GetAllSuppliesAsync()
        {
            return await _context.Supplies.AsNoTracking().ToListAsync();
        }

        public async Task<Supply?> GetSupplyByIdAsync(int id)
        {
            return await _context.Supplies.FindAsync(id);
        }

        public async Task AddSupplyAsync(Supply supply)
        {
            await _context.Supplies.AddAsync(supply);
        }

        public void UpdateSupply(Supply supply)
        {
            _context.Supplies.Update(supply);
        }

        public void DeleteSupply(Supply supply)
        {
            _context.Supplies.Remove(supply);
        }

        public async Task<int> GetTotalSuppliesCountAsync()
        {
            return await _context.Supplies.AsNoTracking().CountAsync();
        }

        public async Task<int> GetLowStockSuppliesCountAsync(int lowStockThreshold)
        {
            return await _context.Supplies.AsNoTracking().CountAsync(s => s.Quantity < lowStockThreshold);
        }

        public async Task<IEnumerable<Supply>> GetLowStockSuppliesAsync(int lowStockThreshold)
        {
            return await _context.Supplies.AsNoTracking().Where(s => s.Quantity < lowStockThreshold).ToListAsync();
        }
    }
}
