using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InventoryManagementAPI.Data
{
    [Table("Cities")]
    public class City
    {
        public int Id { get; set; }
        [StringLength(50)]
        public string Name { get; set; }

        [ForeignKey("Country")]
        public int Country_Id { get; set; }
        public Country Country { get; set; }

        public List<WareHouse> WareHouses { get; set; }
    }
}
