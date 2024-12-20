using WorkshopManager.Models;

namespace WorkshopManager.Interfaces.RepositoryInterfaces
{
    public interface ISupplyRepository
    {
        Task<Supply?> GetSupplyByIdAsync(int id);
        Supply AddSupply(Supply supply);
        Supply UpdateSupply(Supply supply);
        Supply DeleteSupply(Supply supply);
    }
}
