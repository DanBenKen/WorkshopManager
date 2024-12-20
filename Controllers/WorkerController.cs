using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkshopManager.DTOs;
using WorkshopManager.Interfaces.ServiceInterfaces;

namespace WorkshopManager.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class WorkerController : Controller
    {
        private readonly IWorkerService _workerService;

        public WorkerController(IWorkerService workerService)
        {
            _workerService = workerService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateWorker([FromBody] WorkerDTO workerDTO)
        {
            var worker = await _workerService.CreateWorker(workerDTO);
            return CreatedAtAction(nameof(GetWorker), new { id = worker.Id }, worker);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetWorker(int id)
        {
            var worker = await _workerService.GetWorkerAsync(id);
            if (worker == null)
                return NotFound(new { message = "Worker not found." });

            return Ok(worker);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWorker(int id, [FromBody] WorkerDTO workerDTO)
        {
            if (workerDTO == null)
                return BadRequest(new { message = "Worker data is required." });

            var updatedWorker = await _workerService.UpdateWorkerAsync(id, workerDTO);
            if (updatedWorker == null)
                return NotFound(new { message = "Worker not found." });

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorker(int id)
        {
            var result = await _workerService.DeleteWorkerAsync(id);
            if (!result)
                return NotFound(new { message = "Worker not found." });

            return NoContent();
        }
    }
}
