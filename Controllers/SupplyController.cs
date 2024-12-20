using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkshopManager.DTOs;
using WorkshopManager.Interfaces.ServiceInterfaces;

namespace WorkshopManager.Controllers
{
    [Authorize]
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
            var supply = await _supplyService.CreateSupply(supplyDTO);
            return CreatedAtAction(nameof(GetSupply), new { id = supply.Id }, supply);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SupplyDTO>> GetSupply(int id)
        {
            var supply = await _supplyService.GetSupplyAsync(id);
            if (supply == null)
                return NotFound(new { message = "Supply not found." });

            return Ok(supply);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSupply(int id, [FromBody] SupplyDTO supplyDTO)
        {
            var updatedSupply = await _supplyService.UpdateSupplyAsync(id, supplyDTO);
            if (updatedSupply == null)
                return NotFound(new { message = "Supply not found." });

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSupply(int id)
        {
            var result = await _supplyService.DeleteSupplyAsync(id);
            if (!result)
                return NotFound(new { message = "Supply not found." });

            return NoContent();
        }
    }
}
