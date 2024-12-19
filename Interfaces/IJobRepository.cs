using WorkshopManager.Models;

namespace WorkshopManager.Interfaces
{
    public interface IJobRepository
    {
        Task<Job> GetJobByIdAsync(int id);
        Job AddJob(Job job);
        Job UpdateJob(Job job);
        void DeleteJob(int id);
    }
}
