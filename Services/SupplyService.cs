using WorkshopManager.DTOs.SupplyDTOs;
using WorkshopManager.Exceptions;
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

        public async Task<Supply> CreateSupplyAsync(SupplyDTO supplyDTO)
        {
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

        public async Task<Supply?> GetSupplyAsync(int id)
        {
            return await _unitOfWork.SupplyRepository.GetSupplyByIdAsync(id);
        }

        public async Task<Supply?> UpdateSupplyAsync(int id, SupplyDTO supplyDTO)
        {
            var supply = await _unitOfWork.SupplyRepository.GetSupplyByIdAsync(id)
                ?? throw new SupplyNotFoundException(id);

            supply.Name = supplyDTO.Name;
            supply.Quantity = supplyDTO.Quantity;
            supply.Type = supplyDTO.Type;

            _unitOfWork.SupplyRepository.UpdateSupply(supply);
            await _unitOfWork.SaveChangesAsync();

            return supply;
        }

        public async Task DeleteSupplyAsync(int id)
        {
            var supply = await _unitOfWork.SupplyRepository.GetSupplyByIdAsync(id)
                ?? throw new SupplyNotFoundException(id);

            _unitOfWork.SupplyRepository.DeleteSupply(supply);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}
