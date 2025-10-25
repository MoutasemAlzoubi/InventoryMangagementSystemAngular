using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InventoryManagementAPI.Data
{
    [Table("WareHouses")]
    public class WareHouse
    {
        public int Id { get; set; }
        [StringLength(50)]
        public string Name { get; set; }
        [StringLength(250)]
        public string Description { get; set; }

        [ForeignKey("City")]
        public int City_Id { get; set; }

        [ForeignKey("Country")]
        public int Country_Id { get; set; }

        public Country Country { get; set; }
        public City City { get; set; }

        public List<WareHouseItem> WareHouseItems { get; set; }
    }
}
