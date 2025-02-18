using WorkshopManager.Models;

namespace WorkshopManager.Interfaces.RepositoryInterfaces
{
    public interface ISupplyRepository
    {
        Task<IEnumerable<Supply>> GetAllSuppliesAsync();
        Task<Supply?> GetSupplyByIdAsync(int id);
        Task<bool> ExistsAsync(int id);
        Task AddSupplyAsync(Supply supply);
        void UpdateSupply(Supply supply);
        void DeleteSupply(Supply supply);
        Task<int> GetTotalSuppliesCountAsync();
        Task<int> GetLowStockSuppliesCountAsync(int lowStockThreshold);
        Task<IEnumerable<Supply>> GetLowStockSuppliesAsync(int lowStockThreshold);
    }
}
