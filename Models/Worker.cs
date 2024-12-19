namespace WorkshopManager.Models
{
    public class Worker
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Position { get; set; }

        public ICollection<Job> Jobs { get; set; }
    }
}
