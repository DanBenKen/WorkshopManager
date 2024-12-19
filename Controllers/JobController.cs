using Microsoft.AspNetCore.Mvc;
using WorkshopManager.DTOs;
using WorkshopManager.Interfaces;

namespace WorkshopManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : Controller
    {
        private readonly IJobService _jobService;

        public JobController(IJobService jobService)
        {
            _jobService = jobService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateJob([FromBody] JobDTO jobDTO)
        {
            if (jobDTO == null)
            {
                return BadRequest("Job data is required.");
            }

            try
            {
                var createJob = await _jobService.CreateJobAsync(jobDTO);

                return CreatedAtAction(nameof(GetJob), new { id = createJob.Id }, createJob);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetJob(int id)
        {
            var job = await _jobService.GetJobAsync(id);

            if (job == null)
            {
                return NotFound();
            }

            return Ok(job);
        }
    }
}
