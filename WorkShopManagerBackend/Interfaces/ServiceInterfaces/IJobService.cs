using WorkshopManager.DTOs.JobDTOs;

namespace WorkshopManager.Interfaces.ServiceInterfaces
{
    public interface IJobService
    {
        Task<IEnumerable<JobDTO>> GetAllJobsAsync();
        Task<JobDTO> CreateJobAsync(RequestCreateJobDTO createJob);
        Task<JobDTO> UpdateJobAsync(int id, RequestUpdateJobDTO jobDTO);
        Task DeleteJobAsync(int id);
        Task<JobDTO> GetJobAsync(int id);
    }
}
