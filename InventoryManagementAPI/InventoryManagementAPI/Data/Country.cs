using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InventoryManagementAPI.Data
{
    [Table("Countries")]
    public class Country
    {
        public int Id { get; set; }
        [StringLength(20)]
        public string Code { get; set; }
        [StringLength(50)]
        public string Name { get; set; }

        public List<City> Cities { get; set; }
        public List<WareHouse> WareHouses { get; set; }
    }
}
