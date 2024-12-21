using WorkshopManager.DTOs.SupplyDTOs;
using WorkshopManager.Models;

namespace WorkshopManager.Interfaces.RepositoryInterfaces
{
    public interface ISupplyRepository
    {
        Task<Supply?> GetSupplyByIdAsync(int id);
        Supply AddSupply(SupplyDTO supplyDTO);
        Supply UpdateSupply(SupplyDTO supplyDTO);
        Supply DeleteSupply(Supply supply);
    }
}
