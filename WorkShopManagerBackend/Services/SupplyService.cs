using AutoMapper;
using WorkshopManager.DTOs.SupplyDTOs;
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

        private const int lowStockThreshold = 6;

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

        public async Task<SupplyDTO> GetSupplyAsync(int id)
        {
            var supply = await _unitOfWork.SupplyRepository.GetSupplyByIdAsync(id)
                ?? throw new SupplyNotFoundException(id);

            return _mapper.Map<SupplyDTO>(supply);
        }

        public async Task<IEnumerable<SupplyDTO>> GetAllSuppliesAsync()
        {
            var supplies = await _unitOfWork.SupplyRepository.GetAllSuppliesAsync();
            return _mapper.Map<IEnumerable<SupplyDTO>>(supplies);
        }

        public async Task<SupplyDTO> UpdateSupplyAsync(int id, RequestUpdateSupplyDTO requestUpdate)
        {
            var existingSupply = await _unitOfWork.SupplyRepository.GetSupplyByIdAsync(id)
                ?? throw new SupplyNotFoundException(id);

            _mapper.Map(requestUpdate, existingSupply);

            await _unitOfWork.ExecuteInTransactionAsync(() =>
            {
                _unitOfWork.SupplyRepository.UpdateSupply(existingSupply);
                return Task.CompletedTask;
            });

            return _mapper.Map<SupplyDTO>(existingSupply);
        }

        public async Task DeleteSupplyAsync(int id)
        {
            var supply = await _unitOfWork.SupplyRepository.GetSupplyByIdAsync(id)
                ?? throw new SupplyNotFoundException(id);

            await _unitOfWork.ExecuteInTransactionAsync(() =>
            {
                _unitOfWork.SupplyRepository.DeleteSupply(supply);
                return Task.CompletedTask;
            });
        }

        public async Task<int> GetTotalSuppliesCountAsync()
        {
            return await _unitOfWork.SupplyRepository.GetTotalSuppliesCountAsync();
        }

        public async Task<int> GetLowStockSuppliesCountAsync()
        {
            return await _unitOfWork.SupplyRepository.GetLowStockSuppliesCountAsync(lowStockThreshold);
        }

        public async Task<IEnumerable<SupplyDTO>> GetLowStockSuppliesAsync()
        {
            var lowStockSupplies = await _unitOfWork.SupplyRepository.GetLowStockSuppliesAsync(lowStockThreshold);
            return _mapper.Map<IEnumerable<SupplyDTO>>(lowStockSupplies);
        }
    }
}
