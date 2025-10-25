using System.ComponentModel.DataAnnotations;

namespace InventoryManagementAPI.Model
{
    public class WareHouseItemDTO
    {
        public int Id { get; set; }
        [StringLength(50)]
        [Required]
        public string Name { get; set; }
        [StringLength(50)]
        [Required]
        public string Code { get; set; }
        [Required]
        [Range(1, 1000, ErrorMessage = "Quantity must be between 1 and 1000.")]
        public int Qty { get; set; }
        [Required]
        [Range(1, 100000, ErrorMessage = "Quantity must be between 1 and 100000.")]
        public double CostPrice { get; set; }
        [Required]
        public int WareHouse_Id { get; set; }
        public WareHouseDTO? ware { get; set; }
    }
}
