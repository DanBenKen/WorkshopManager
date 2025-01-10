using WorkshopManager.DTOs.SupplyDTOs;
using WorkshopManager.Models;

namespace WorkshopManager.Interfaces.RepositoryInterfaces
{
    public interface ISupplyRepository
    {
        Task<IEnumerable<Supply>> GetAllSuppliesAsync();
        Task<Supply?> GetSupplyByIdAsync(int id);
        Task<Supply> AddSupplyAsync(SupplyDTO supplyDTO);
        Supply UpdateSupply(int id, SupplyDTO supplyDTO);
        bool DeleteSupply(Supply supply);
    }
}
