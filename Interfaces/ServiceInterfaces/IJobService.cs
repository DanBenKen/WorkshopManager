using WorkshopManager.DTOs;
using WorkshopManager.Models;

namespace WorkshopManager.Interfaces.ServiceInterfaces
{
    public interface IJobService
    {
        Task<JobDTO> CreateJobAsync(RequestCreateJobDTO requestCreateJob);
        Task<JobDTO> UpdateJobAsync(int id, RequestUpdateJobDTO jobDTO);
        Task<bool> DeleteJobAsync(int id);
        Task<JobDTO> GetJobAsync(int id);
    }
}
