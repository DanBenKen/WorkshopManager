#nullable disable

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WorkshopManager.Models;

public class WorkshopDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
{
    public WorkshopDbContext(DbContextOptions<WorkshopDbContext> options) : base(options) { }

    public DbSet<Job> Jobs { get; set; }
    public DbSet<Supply> Supplies { get; set; }
    public DbSet<Worker> Workers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Job>()
            .HasOne(j => j.Supply)
            .WithMany(s => s.Jobs)
            .HasForeignKey(j => j.SupplyId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Job>()
            .HasOne(j => j.Worker)
            .WithMany(w => w.Jobs)
            .HasForeignKey(j => j.WorkerId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
