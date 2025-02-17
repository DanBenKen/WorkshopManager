﻿using Microsoft.AspNetCore.Authorization;
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
        public async Task<IActionResult> UpdateWorker(int id, [FromBody] RequestUpdateWorkerDTO workerDTO)
        {
            await _workerService.UpdateWorkerAsync(id, workerDTO);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorker(int id)
        {
            var isDeleted = await _workerService.DeleteWorkerAsync(id);
            return isDeleted ? NoContent() : NotFound();
        }

        [HttpGet("count")]
        public async Task<IActionResult> GetWorkersCount()
        {
            var count = await _workerService.GetWorkersCountAsync();
            return Ok(new { Count = count });
        }

        [HttpGet("unemployed-count")]
        public async Task<IActionResult> GetUnemployedWorkersCount()
        {
            var count = await _workerService.GetUnemployedWorkersCountAsync();
            return Ok(new { UnemployedCount = count });
        }

        [HttpGet("workers-without-jobs")]
        public async Task<IActionResult> GetWorkersWithoutJobs()
        {
            var workersWithoutJobs = await _workerService.GetWorkersWithoutJobsAsync();
            return Ok(workersWithoutJobs);
        }
    }
}
