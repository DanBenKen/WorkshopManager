using WorkshopManager.DTOs.SupplyDTOs;
using WorkshopManager.Models;

namespace WorkshopManager.Interfaces.ServiceInterfaces
{
    public interface ISupplyService
    {
        Task<SupplyDTO> CreateSupplyAsync(RequestCreateSupplyDTO requestCreateSupply);
        Task<SupplyDTO> GetSupplyAsync(int id);
        Task<SupplyDTO> UpdateSupplyAsync(int id, RequestUpdateSupplyDTO requestUpdate);
        Task<bool> DeleteSupplyAsync(int id);
    }
}
