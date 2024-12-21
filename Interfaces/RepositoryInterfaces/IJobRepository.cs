using WorkshopManager.DTOs;
using WorkshopManager.Models;

namespace WorkshopManager.Interfaces.RepositoryInterfaces
{
    public interface IJobRepository
    {
        Task<Job?> GetJobByIdAsync(int id);
        Task<IEnumerable<Job>> GetJobsByWorkerIdAsync(int workerId);
        Job AddJob(RequestCreateJobDTO createJobDTO, string firstName, string lastName);
        Job UpdateJob(JobDTO job);
        bool DeleteJob(Job job);
    }
}
