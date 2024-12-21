using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkshopManager.DTOs.WorkerDTOs;
using WorkshopManager.Interfaces.ServiceInterfaces;

namespace WorkshopManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkerController : ControllerBase
    {
        private readonly IWorkerService _workerService;

        public WorkerController(IWorkerService workerService)
        {
            _workerService = workerService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateWorker([FromBody] WorkerDTO workerDTO)
        {
            var worker = await _workerService.CreateWorkerAsync(workerDTO);
            return CreatedAtAction(nameof(GetWorker), new { id = worker.Id }, worker);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetWorker(int id)
        {
            var worker = await _workerService.GetWorkerAsync(id);
            return Ok(worker);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllWorkers()
        {
            var workers = await _workerService.GetAllWorkersAsync();
            return Ok(workers);
        }

        [HttpGet("workers-with-jobs")]
        public async Task<IActionResult> GetWorkersWithJobs()
        {
            var workersWithJobs = await _workerService.GetAllWorkersWithJobsAsync();
            return Ok(workersWithJobs);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWorker(int id, [FromBody] WorkerDTO workerDTO)
        {
            await _workerService.UpdateWorkerAsync(id, workerDTO);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorker(int id)
        {
            await _workerService.DeleteWorkerAsync(id);
            return NoContent();
        }
    }
}
