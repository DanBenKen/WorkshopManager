using WorkshopManager.DTOs.SupplyDTOs;

namespace WorkshopManager.Interfaces.ServiceInterfaces
{
    public interface ISupplyService
    {
        Task<SupplyDTO> CreateSupplyAsync(RequestCreateSupplyDTO requestCreateSupply);
        Task<IEnumerable<SupplyDTO>> GetAllSuppliesAsync();
        Task<SupplyDTO> GetSupplyAsync(int id);
        Task<SupplyDTO> UpdateSupplyAsync(int id, RequestUpdateSupplyDTO requestUpdate);
        Task DeleteSupplyAsync(int id);
        Task<int> GetTotalSuppliesCountAsync();
        Task<int> GetLowStockSuppliesCountAsync();
        Task<IEnumerable<SupplyDTO>> GetLowStockSuppliesAsync();
    }
}
