using System.ComponentModel.DataAnnotations;
namespace InventoryManagementAPI.Model
{
    public class WareHouseDTO
    {
        public int Id { get; set; }
        [StringLength(50)]
        [Required]
        public string Name { get; set; }
        [StringLength(250)]
        [Required]
        public string Description { get; set; }
        [Required]
        public int City_Id { get; set; }
        [Required]
        public int Country_Id { get; set; }
        public CityDTO? city { get; set; }
        public CountryDTO? country { get; set; }
    }
}
