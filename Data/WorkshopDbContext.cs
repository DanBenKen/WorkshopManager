using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WorkshopManager.Models;

public class WorkshopDbContext : IdentityDbContext<ApplicationUser>
{
    public WorkshopDbContext(DbContextOptions<WorkshopDbContext> options) : base(options) { }

    public DbSet<Job> Jobs { get; set; }
    public DbSet<Supply> Supplies { get; set; }
    public DbSet<Worker> Workers { get; set; }
}
