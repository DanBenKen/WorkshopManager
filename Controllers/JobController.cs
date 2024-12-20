using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkshopManager.DTOs;
using WorkshopManager.Interfaces.ServiceInterfaces;

namespace WorkshopManager.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : Controller
    {
        private readonly IJobService _jobService;

        public JobController(IJobService jobService)
        {
            _jobService = jobService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateJob([FromBody] JobDTO jobDTO)
        {
            if (jobDTO == null)
                return BadRequest( new { message = "Job data is required." });

            try
            {
                var createJob = await _jobService.CreateJobAsync(jobDTO);

                return CreatedAtAction(nameof(GetJob), new { id = createJob.Id }, createJob);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "An unexpected error occurred while creating the job.",
                    details = ex.Message
                });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetJob(int id)
        {
            try
            {
                var job = await _jobService.GetJobAsync(id);
                if (job == null)
                    return NotFound(new { message = "Job not found." });

                return Ok(job);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "An unexpected error occurred while fetching the job.",
                    details = ex.Message
                });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateJob(int id, [FromBody] JobDTO jobDTO)
        {
            if (jobDTO == null)
                return BadRequest(new { message = "Job data is required." });

            try
            {
                var updatedJob = await _jobService.UpdateJobAsync(id, jobDTO);
                if (updatedJob == null)
                    return NotFound(new { message = "Job not found." });

                return Ok(updatedJob);
                //return NoContent(); 204 No Content
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "An unexpected error occurred while creating the job.",
                    details = ex.Message
                });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJob(int id)
        {
            try
            {
                var result = await _jobService.DeleteJobAsync(id);
                if (!result)
                    return NotFound(new { message = "Job not found." });

                return Ok("Job deleted.");
                // return NoContent(); 204 No Content
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "An unexpected error occurred while creating the job.",
                    details = ex.Message
                });
            }
        }
    }
}
