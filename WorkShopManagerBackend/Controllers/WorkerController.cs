using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkshopManager.DTOs.WorkerDTOs;
using WorkshopManager.Interfaces.ServiceInterfaces;

namespace WorkshopManager.Controllers
{
    [Authorize(Roles = "Admin")]
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
        public async Task<IActionResult> CreateWorker([FromBody] RequestCreateWorkerDTO workerDTO)
        {
            var createdWorker = await _workerService.CreateWorkerAsync(workerDTO);
            return CreatedAtAction(nameof(GetWorker), new { id = createdWorker.Id }, createdWorker);
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

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWorker(int id, [FromBody] RequestUpdateWorkerDTO workerDTO)
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

        [HttpGet("count")]
        public async Task<IActionResult> GetWorkersCount()
        {
            var count = await _workerService.GetWorkersCountAsync();
            return Ok(new { Count = count });
        }

        [HttpGet("unemployed-worker-count")]
        public async Task<IActionResult> GetUnemployedWorkersCount()
        {
            var count = await _workerService.GetUnemployedWorkersCountAsync();
            return Ok(new { UnemployedCount = count });
        }

        [HttpGet("employed-workers")]
        public async Task<IActionResult> GetWorkersWithJobs()
        {
            var workersWithJobs = await _workerService.GetAllWorkersWithJobsAsync();
            return Ok(workersWithJobs);
        }

        [HttpGet("unemployed-workers")]
        public async Task<IActionResult> GetUnemployedWorkers()
        {
            var workersWithoutJobs = await _workerService.GetWorkersWithoutJobsAsync();
            return Ok(workersWithoutJobs);
        }
    }
}
