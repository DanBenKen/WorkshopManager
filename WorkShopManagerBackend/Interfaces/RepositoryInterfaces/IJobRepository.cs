using WorkshopManager.Models;

namespace WorkshopManager.Interfaces.RepositoryInterfaces
{
    public interface IJobRepository
    {
        Task<Job?> GetJobByIdAsync(int id);
        Task<IEnumerable<Job>> GetAllJobsAsync();
        Task<Job?> GetJobWithDetailsAsync(int id);
        Task AddJobAsync(Job job);
        void UpdateJob(Job job);
        void DeleteJob(Job job);
    }
}
