using AutoMapper;
using WorkshopManager.DTOs.SupplyDTOs;
using WorkshopManager.Exceptions;
using WorkshopManager.Exceptions.SupplyExceptions;
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
            SupplyDTO? supplyDTO = null;

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                supplyDTO = _mapper.Map<SupplyDTO>(requestCreateSupply);

                await _unitOfWork.SupplyRepository.AddSupply(supplyDTO);
            });

            if (supplyDTO is null)
                throw new SupplyCreateNullException();

            return supplyDTO;
        }

        public async Task<SupplyDTO> GetSupplyAsync(int id)
        {
            SupplyDTO? getSupply = null;

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                var supply = await _unitOfWork.SupplyRepository.GetSupplyByIdAsync(id)
                    ?? throw new SupplyNotFoundException(id);

                getSupply = _mapper.Map<SupplyDTO>(supply);
            });

            if (getSupply is null)
                throw new SupplyGetNullException();

            return getSupply;
        }

        public async Task<SupplyDTO> UpdateSupplyAsync(int id, RequestUpdateSupplyDTO requestUpdate)
        {
            SupplyDTO? updateSupply = null;

            await _unitOfWork.ExecuteInTransactionAsync(() =>
            {
                updateSupply = _mapper.Map<SupplyDTO>(requestUpdate);

                _unitOfWork.SupplyRepository.UpdateSupply(id, updateSupply);
                return Task.CompletedTask;
            });

            if (updateSupply is null)
                throw new SupplyUpdateNullException();
                      
            return updateSupply;
        }

        public async Task<bool> DeleteSupplyAsync(int id)
        {
            bool isDeleted = false;

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                var supply = await _unitOfWork.SupplyRepository.GetSupplyByIdAsync(id)
                    ?? throw new SupplyNotFoundException(id);

                isDeleted = _unitOfWork.SupplyRepository.DeleteSupply(supply);
            });

            return isDeleted;
        }
    }
}
