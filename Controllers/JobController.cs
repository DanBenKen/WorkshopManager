using Microsoft.AspNetCore.Mvc;
using WorkshopManager.Interfaces.ServiceInterfaces;
using WorkshopManager.Models;

namespace WorkshopManager.Controllers
{
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
        public async Task<IActionResult> CreateJob([FromBody] RequestCreateJobDTO requestCreateJob)
        {
            var createJob = await _jobService.CreateJobAsync(requestCreateJob);
            return CreatedAtAction(nameof(GetJob), new { id = createJob.Id }, createJob);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetJob(int id)
        {
            var job = await _jobService.GetJobAsync(id);
            return Ok(job);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateJob(int id, [FromBody] RequestUpdateJobDTO updateJob)
        {
            await _jobService.UpdateJobAsync(id, updateJob);
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
