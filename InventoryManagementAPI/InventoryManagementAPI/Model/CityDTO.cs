using System.ComponentModel.DataAnnotations;

namespace InventoryManagementAPI.Model
{
    public class CityDTO
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public int Country_Id { get; set; }
        public CountryDTO? Country { get; set; }
    }
}
