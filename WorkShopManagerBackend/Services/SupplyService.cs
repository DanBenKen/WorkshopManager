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
            var supplyEntity = _mapper.Map<Supply>(requestCreateSupply);

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await _unitOfWork.SupplyRepository.AddSupplyAsync(supplyEntity);
            });

            return _mapper.Map<SupplyDTO>(supplyEntity);
        }

        public async Task<IEnumerable<SupplyDTO>> GetAllSuppliesAsync()
        {
            var supplies = await _unitOfWork.SupplyRepository.GetAllSuppliesAsync();

            return _mapper.Map<IEnumerable<SupplyDTO>>(supplies);
        }

        public async Task<SupplyDTO> GetSupplyAsync(int id)
        {
            var supply = await _unitOfWork.SupplyRepository.GetSupplyByIdAsync(id)
                ?? throw new SupplyNotFoundException(id);

            return _mapper.Map<SupplyDTO>(supply);
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
