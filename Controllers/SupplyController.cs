using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkshopManager.DTOs.SupplyDTOs;
using WorkshopManager.Interfaces.ServiceInterfaces;

namespace WorkshopManager.Controllers
{
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
        public async Task<ActionResult<SupplyDTO>> CreateSupply([FromBody] SupplyDTO supplyDTO)
        {
            var supply = await _supplyService.CreateSupplyAsync(supplyDTO);
            return CreatedAtAction(nameof(GetSupply), new { id = supply.Id }, supply);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SupplyDTO>> GetSupply(int id)
        {
            var supply = await _supplyService.GetSupplyAsync(id);
            return Ok(supply);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSupply(int id, [FromBody] SupplyDTO supplyDTO)
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
    }
}
