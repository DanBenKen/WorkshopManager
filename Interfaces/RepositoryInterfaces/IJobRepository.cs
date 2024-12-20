using WorkshopManager.Models;

namespace WorkshopManager.Interfaces.RepositoryInterfaces
{
    public interface IJobRepository
    {
        Task<Job?> GetJobByIdAsync(int id);
        Task<IEnumerable<Job>> GetJobsByWorkerIdAsync(int workerId);
        Job AddJob(Job job);
        Job UpdateJob(Job job);
        Job DeleteJob(Job job);
    }
}
