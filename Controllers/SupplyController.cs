using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkshopManager.DTOs;
using WorkshopManager.Interfaces.ServiceInterfaces;

namespace WorkshopManager.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SupplyController : Controller
    {
        private readonly ISupplyService _supplyService;

        public SupplyController(ISupplyService supplyService)
        {
            _supplyService = supplyService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateSupply([FromBody] SupplyDTO supplyDTO)
        {
            if (supplyDTO == null)
                return BadRequest("Supply data is required.");

            try
            {
                var supply = await _supplyService.CreateSupply(supplyDTO);
                return CreatedAtAction(nameof(GetSupply), new { id = supply.Id }, supply);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSupply(int id)
        {
            try
            {
                var supply = await _supplyService.GetSupplyAsync(id);
                if (supply == null)
                    return NotFound();

                return Ok(supply);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSupply(int id, [FromBody] SupplyDTO supplyDTO)
        {
            if (supplyDTO == null)
                return BadRequest("Supply data is required.");

            try
            {
                var updatedSupply = await _supplyService.UpdateSupplyAsync(id, supplyDTO);
                if (updatedSupply == null)
                    return NotFound("Supply not found.");

                return Ok(updatedSupply);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSupply(int id)
        {
            try
            {
                var result = await _supplyService.DeleteSupplyAsync(id);
                if (!result)
                    return NotFound("Supply not found.");

                return Ok("Supply deleted.");
                //return NoContent(); 204 No Content
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
