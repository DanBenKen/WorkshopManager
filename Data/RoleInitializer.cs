using Microsoft.AspNetCore.Identity;

namespace WorkshopManager.Data
{
    public class RoleInitializer
    {
        public static async Task Initialize(IServiceProvider serviceProvider, RoleManager<IdentityRole> roleManager)
        {
            if (!await roleManager.RoleExistsAsync("Admin"))
            {
                await roleManager.CreateAsync(new IdentityRole("Admin"));
            }

            if (!await roleManager.RoleExistsAsync("User"))
            {
                await roleManager.CreateAsync(new IdentityRole("User"));
            }
        }
    }
}
