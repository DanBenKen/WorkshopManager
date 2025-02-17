using Microsoft.EntityFrameworkCore;
using WorkshopManager.DTOs.SupplyDTOs;
using WorkshopManager.Models;

namespace WorkshopManager.Interfaces.RepositoryInterfaces
{
    public interface ISupplyRepository
    {
        Task<IEnumerable<Supply>> GetAllSuppliesAsync();
        Task<Supply?> GetSupplyByIdAsync(int id);
        Task<Supply> AddSupplyAsync(Supply supply);
        Task UpdateSupplyAsync(int id, SupplyDTO supplyDTO);
        bool DeleteSupply(Supply supply);
        Task<int> GetTotalSuppliesCountAsync();
        Task<int> GetLowStockSuppliesCountAsync();
        Task<IEnumerable<Supply>> GetLowStockSuppliesAsync();
    }
}
