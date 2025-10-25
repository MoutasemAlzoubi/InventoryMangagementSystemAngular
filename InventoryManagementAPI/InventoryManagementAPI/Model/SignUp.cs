using System.ComponentModel.DataAnnotations;

namespace InventoryManagementAPI.Model
{
    public class SignUp
    {

        public string? Id { get; set; }
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Name { get; set; }
        [Required]
        public string Password { get; set; }
        [Compare("Password")]
        [Required]
        public string ConfirmPassword { get; set; }
        [Required]
        public string RoleName { get; set; }
    }
}
