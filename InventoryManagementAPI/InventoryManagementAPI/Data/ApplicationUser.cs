using Microsoft.AspNetCore.Identity;

namespace InventoryManagementAPI.Data
{
    public class ApplicationUser: IdentityUser
    {
        public string Name { get; set; }
    }
}
