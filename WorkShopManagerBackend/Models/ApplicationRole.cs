using Microsoft.AspNetCore.Identity;

namespace WorkshopManager.Models
{
    public class ApplicationRole : IdentityRole
    {
        public ApplicationRole(string roleName) : base(roleName) { }
        public ApplicationRole() { }
    }
}
