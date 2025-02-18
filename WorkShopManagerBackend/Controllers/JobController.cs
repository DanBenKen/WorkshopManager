using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkshopManager.DTOs.JobDTOs;
using WorkshopManager.Interfaces.ServiceInterfaces;

namespace WorkshopManager.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private readonly IJobService _jobService;

        public JobController(IJobService jobService)
        {
            _jobService = jobService;
        }

        [HttpPost]
        public async Task<ActionResult<JobDTO>> CreateJob([FromBody] RequestCreateJobDTO requestDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var job = await _jobService.CreateJobAsync(requestDTO);
            return CreatedAtAction(nameof(GetJob), new { id = job.Id }, job);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobDTO>>> GetAllJobs()
        {
            var jobs = await _jobService.GetAllJobsAsync();
            return Ok(jobs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<JobDTO>> GetJob(int id)
        {
            var job = await _jobService.GetJobAsync(id);
            return Ok(job);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateJob(int id, [FromBody] RequestUpdateJobDTO updateDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _jobService.UpdateJobAsync(id, updateDTO);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJob(int id)
        {
            await _jobService.DeleteJobAsync(id);
            return NoContent();
        }
    }
}