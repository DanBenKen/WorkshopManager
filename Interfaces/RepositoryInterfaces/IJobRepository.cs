using WorkshopManager.DTOs.JobDTOs;
using WorkshopManager.Models;

namespace WorkshopManager.Interfaces.RepositoryInterfaces
{
    public interface IJobRepository
    {
        Task<Job?> GetJobByIdAsync(int id);
        Task<IEnumerable<Job>> GetJobsByWorkerIdAsync(int workerId);
        Job AddJob(JobDTO jobDTO, string workerName);
        Job UpdateJob(int id, JobDTO job);
        bool DeleteJob(Job job);
    }
}
