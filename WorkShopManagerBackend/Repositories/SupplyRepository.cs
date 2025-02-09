﻿using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WorkshopManager.DTOs.SupplyDTOs;
using WorkshopManager.Exceptions.SupplyExceptions;
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

        public async Task<IEnumerable<Supply>> GetAllSuppliesAsync()
        {
            return await _context.Supplies.ToListAsync();
        }

        public async Task<Supply?> GetSupplyByIdAsync(int id)
        {
            return await _context.Supplies.FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<Supply> AddSupplyAsync(SupplyDTO supplyDTO)
        {
            var supply = _mapper.Map<Supply>(supplyDTO);

            await _context.Supplies.AddAsync(supply);
            return supply;
        }

        public async Task UpdateSupplyAsync(int id, SupplyDTO supplyDTO)
        {
            var supply = await _context.Supplies.FindAsync(id)
                ?? throw new SupplyNotFoundException(id);

            _mapper.Map(supplyDTO, supply);
            _context.Supplies.Update(supply);
        }

        public bool DeleteSupply(Supply supply)
        {
            _context.Supplies.Remove(supply);
            return true;
        }

        public async Task<int> GetTotalSuppliesCountAsync()
        {
            return await _context.Supplies.CountAsync();
        }

        public async Task<int> GetLowStockSuppliesCountAsync()
        {
            return await _context.Supplies.CountAsync(s => s.Quantity < 5);
        }

        public async Task<IEnumerable<Supply>> GetLowStockSuppliesAsync()
        {
            return await _context.Supplies
                                 .Where(s => s.Quantity < 5)
                                 .ToListAsync();
        }
    }
}
