using AutoMapper;
using WorkshopManager.DTOs.SupplyDTOs;
using WorkshopManager.DTOs.WorkerDTOs;
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

            supplyDTO = _mapper.Map<SupplyDTO>(requestCreateSupply) 
                ?? throw new SupplyCreateNullException();

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await _unitOfWork.SupplyRepository.AddSupplyAsync(supplyDTO);
            });

            return supplyDTO;
        }

        public async Task<IEnumerable<Supply>> GetAllSppliesAsync()
        {
            return await _unitOfWork.SupplyRepository.GetAllSuppliesAsync();
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

            updateSupply = _mapper.Map<SupplyDTO>(requestUpdate);

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await _unitOfWork.SupplyRepository.UpdateSupplyAsync(id, updateSupply);
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

        public async Task<int> GetTotalSuppliesCountAsync()
        {
            return await _unitOfWork.SupplyRepository.GetTotalSuppliesCountAsync();
        }

        public async Task<int> GetLowStockSuppliesCountAsync()
        {
            return await _unitOfWork.SupplyRepository.GetLowStockSuppliesCountAsync();
        }

        public async Task<IEnumerable<SupplyDTO>> GetLowStockSuppliesAsync()
        {
            var lowStockSupplies = await _unitOfWork.SupplyRepository.GetLowStockSuppliesAsync();
            return _mapper.Map<IEnumerable<SupplyDTO>>(lowStockSupplies);
        }
    }
}
