using WorkshopManager.DTOs;
using WorkshopManager.Models;

namespace WorkshopManager.Interfaces.ServiceInterfaces
{
    public interface ISupplyService
    {
        Task<Supply> CreateSupply(SupplyDTO supplyDTO);
        Task<Supply?> GetSupplyAsync(int id);
        Task<Supply?> UpdateSupplyAsync(int id, SupplyDTO supplyDTO);
        Task<bool> DeleteSupplyAsync(int id);
    }
}
