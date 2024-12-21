using AutoMapper;
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
        private readonly IMapper _mapper;

        public SupplyService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<SupplyDTO> CreateSupplyAsync(RequestCreateSupplyDTO requestCreateSupply)
        {
            var supplyDTO = _mapper.Map<SupplyDTO>(requestCreateSupply);

            _unitOfWork.SupplyRepository.AddSupply(supplyDTO);
            await _unitOfWork.SaveChangesAsync();

            return supplyDTO;
        }

        public async Task<SupplyDTO> GetSupplyAsync(int id)
        {
            var supply = await _unitOfWork.SupplyRepository.GetSupplyByIdAsync(id)
                ?? throw new SupplyNotFoundException(id);

            var getSupply = _mapper.Map<SupplyDTO>(supply);
            return getSupply;
        }

        public async Task<SupplyDTO> UpdateSupplyAsync(int id, RequestUpdateSupplyDTO requestUpdate)
        {
            var updateSupply = _mapper.Map<SupplyDTO>(requestUpdate);

            _unitOfWork.SupplyRepository.UpdateSupply(id, updateSupply);
            await _unitOfWork.SaveChangesAsync();

            return updateSupply;
        }

        public async Task<bool> DeleteSupplyAsync(int id)
        {
            var supply = await _unitOfWork.SupplyRepository.GetSupplyByIdAsync(id)
                ?? throw new SupplyNotFoundException(id);

            var isDeleted = _unitOfWork.SupplyRepository.DeleteSupply(supply);
            if (isDeleted) 
            {
                await _unitOfWork.SaveChangesAsync();
                return true;
            }

            return false;
        }
    }
}
