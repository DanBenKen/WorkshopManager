using WorkshopManager.DTOs.JobDTOs;

namespace WorkshopManager.Interfaces.ServiceInterfaces
{
    public interface IJobService
    {
        Task<IEnumerable<JobDTO>> GetAllJobs();
        Task<JobDTO> CreateJobAsync(RequestCreateJobDTO createJob);
        Task<JobDTO> UpdateJobAsync(int id, RequestUpdateJobDTO jobDTO);
        Task<bool> DeleteJobAsync(int id);
        Task<JobDTO> GetJobAsync(int id);
    }
}
