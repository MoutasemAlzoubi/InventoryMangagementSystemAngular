using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InventoryManagementAPI.Data
{
    [Table("WareHouseItems")]
    public class WareHouseItem
    {
        public int Id { get; set; }
        [StringLength(50)]
        public string Name { get; set; }
        [StringLength(50)]
        public string Code { get; set; }
        
        public int Qty { get; set; }
        public double CostPrice { get; set; }

        [ForeignKey("WareHouse")]
        public int WareHouse_Id { get; set; }
        public WareHouse WareHouse { get; set; }
    }
}
