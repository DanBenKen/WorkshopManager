using WorkshopManager.DTOs;
using WorkshopManager.Interfaces;
using WorkshopManager.Interfaces.ServiceInterfaces;
using WorkshopManager.Models;

namespace WorkshopManager.Services
{
    public class SupplyService : ISupplyService
    {
        private readonly IUnitOfWork _unitOfWork;

        public SupplyService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Supply> CreateSupply(SupplyDTO supplyDTO)
        {
            if (supplyDTO == null)
                throw new ArgumentNullException(nameof(supplyDTO));

            var supply = new Supply()
            {
                Name = supplyDTO.Name,
                Quantity = supplyDTO.Quantity,
                Type = supplyDTO.Type,
            };

            _unitOfWork.SupplyRepository.AddSupply(supply);
            await _unitOfWork.SaveChangesAsync();

            return supply;
        }

        public async Task<Supply> GetSupplyAsync(int id)
        {
            return await _unitOfWork.SupplyRepository.GetSupplyById(id);
        }

        public async Task<Supply> UpdateSupplyAsync(int id, SupplyDTO supplyDTO)
        {
            var supply = await _unitOfWork.SupplyRepository.GetSupplyById(id);

            supply.Name = supplyDTO.Name;
            supply.Quantity = supplyDTO.Quantity;
            supply.Type = supplyDTO.Type;

            _unitOfWork.SupplyRepository.UpdateSupply(supply);
            await _unitOfWork.SaveChangesAsync();

            return supply;
        }

        public async Task<bool> DeleteSupplyAsync(int id)
        {
            var supply = await _unitOfWork.SupplyRepository.GetSupplyById(id);
            if (supply == null)
                return false;

            _unitOfWork.SupplyRepository.DeleteSupply(supply);
            await _unitOfWork.SaveChangesAsync();

            return true;
        }
    }
}
