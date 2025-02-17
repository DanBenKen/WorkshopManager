using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkshopManager.DTOs.SupplyDTOs;
using WorkshopManager.Interfaces.ServiceInterfaces;

namespace WorkshopManager.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class SupplyController : ControllerBase
    {
        private readonly ISupplyService _supplyService;

        public SupplyController(ISupplyService supplyService)
        {
            _supplyService = supplyService;
        }

        [HttpPost]
        public async Task<ActionResult<SupplyDTO>> CreateSupply([FromBody] RequestCreateSupplyDTO supplyCreateDTO)
        {
            var supply = await _supplyService.CreateSupplyAsync(supplyCreateDTO);
            return CreatedAtAction(nameof(GetSupply), new { id = supply.Id }, supply);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SupplyDTO>> GetSupply(int id)
        {
            var supply = await _supplyService.GetSupplyAsync(id);
            return Ok(supply);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSupply(int id, [FromBody] RequestUpdateSupplyDTO supplyDTO)
        {
            await _supplyService.UpdateSupplyAsync(id, supplyDTO);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSupply(int id)
        {
            await _supplyService.DeleteSupplyAsync(id);
            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSupplies()
        {
            var supplies = await _supplyService.GetAllSuppliesAsync();
            return Ok(supplies);
        }

        [HttpGet("count")]
        public async Task<IActionResult> GetTotalSuppliesCount()
        {
            var count = await _supplyService.GetTotalSuppliesCountAsync();
            return Ok(new { count });
        }

        [HttpGet("low-stock-count")]
        public async Task<IActionResult> GetLowStockSuppliesCount()
        {
            var lowStockCount = await _supplyService.GetLowStockSuppliesCountAsync();
            return Ok(new { lowStockCount });
        }

        [HttpGet("low-stock")]
        public async Task<ActionResult<IEnumerable<SupplyDTO>>> GetLowStockSupplies()
        {
            var lowStockSupplies = await _supplyService.GetLowStockSuppliesAsync();
            return Ok(lowStockSupplies);
        }
    }
}