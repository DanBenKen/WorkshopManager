using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WorkshopManager.DTOs.SupplyDTOs;
using WorkshopManager.Interfaces.RepositoryInterfaces;
using WorkshopManager.Models;

namespace WorkshopManager.Repositories
{
    public class SupplyRepository : ISupplyRepository
    {
        private readonly WorkshopDbContext _context;
        private readonly IMapper _mapper;

        public SupplyRepository(WorkshopDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Supply?> GetSupplyByIdAsync(int id)
        {
            return await _context.Supplies.FirstOrDefaultAsync(s => s.Id == id);
        }

        public Supply AddSupply(SupplyDTO supplyDTO)
        {
            var supply = _mapper.Map<Supply>(supplyDTO);

            _context.Supplies.Add(supply);
            return supply;
        }

        public Supply UpdateSupply(SupplyDTO supplyDTO)
        {
            var supply = _mapper.Map<Supply>(supplyDTO);

            _context.Supplies.Update(supply);
            return supply;
        }

        public Supply DeleteSupply(Supply supply)
        {
            _context.Supplies.Remove(supply);
            return supply;
        }
    }
}
