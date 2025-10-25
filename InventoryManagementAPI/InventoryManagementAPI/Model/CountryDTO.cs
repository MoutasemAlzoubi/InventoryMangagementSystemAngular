using System.ComponentModel.DataAnnotations;

namespace InventoryManagementAPI.Model
{
    public class CountryDTO
    {
        public int Id { get; set; }
        [Required]
        [StringLength(30)]
        public string Code { get; set; }
        [Required]
        [StringLength(30)]
        public string Name { get; set; }
    }
}
