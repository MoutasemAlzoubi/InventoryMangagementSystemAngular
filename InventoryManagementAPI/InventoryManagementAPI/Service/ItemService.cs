using InventoryManagementAPI.Data;
using InventoryManagementAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementAPI.Service
{
    public class ItemService: IItemService
    {
        InventoryContext context;
        public ItemService(InventoryContext _context)
        {
            context = _context;

        }
        public void SaveItem(WareHouseItemDTO itemDTO)
        {
            WareHouseItem item = new WareHouseItem();
            item.Name = itemDTO.Name;
            item.Code = itemDTO.Code;
            item.Qty = itemDTO.Qty;
            item.CostPrice = itemDTO.CostPrice;
            item.WareHouse_Id = itemDTO.WareHouse_Id;
            if (item.WareHouse_Id == 0)
            {
                Console.WriteLine("the Inventory is empty");

            }
            else
            {
                context.WareHouseItems.Add(item);
                context.SaveChanges();
            }
        }
        public List<WareHouseItemDTO> ItemList()
        {
            List<WareHouseItem> items = context.WareHouseItems.Include("WareHouse").ToList();
            List<WareHouseItemDTO> itemDTOs = new List<WareHouseItemDTO>();
            foreach (WareHouseItem item in items)
            {
                WareHouseItemDTO itemDTO = new WareHouseItemDTO();
                itemDTO.Id = item.Id;
                itemDTO.Name = item.Name;
                itemDTO.Code = item.Code;
                itemDTO.Qty = item.Qty;
                itemDTO.CostPrice = item.CostPrice;
                itemDTO.WareHouse_Id = item.WareHouse_Id;
                itemDTO.ware = new WareHouseDTO();
                itemDTO.ware.Name = item.WareHouse.Name;
                itemDTOs.Add(itemDTO);
            }
            return itemDTOs;
        }
        public void DeleteItem(int ItemId)
        {
            WareHouseItem item = context.WareHouseItems.Where(i => i.Id == ItemId).FirstOrDefault();
            context.WareHouseItems.Remove(item);
            context.SaveChanges();
        }
        public WareHouseItemDTO EditItem(int ItemId)
        {
            WareHouseItem item = context.WareHouseItems.Include("WareHouse").Where(w => w.Id == ItemId).FirstOrDefault();
            WareHouseItemDTO itemDTO = new WareHouseItemDTO();
            itemDTO.Id = item.Id;
            itemDTO.Name = item.Name;
            itemDTO.Code = item.Code;
            itemDTO.Qty = item.Qty;
            itemDTO.CostPrice = item.CostPrice;
            itemDTO.WareHouse_Id = item.WareHouse_Id;
            itemDTO.ware = new WareHouseDTO();
            itemDTO.ware.Name = item.WareHouse.Name;
            return itemDTO;
        }
        public void UpdateItem(WareHouseItemDTO itemDTO)
        {
            WareHouseItem item = new WareHouseItem();
            item.Id = itemDTO.Id;
            item.Name = itemDTO.Name;
            item.Code = itemDTO.Code;
            item.Qty = itemDTO.Qty;
            item.CostPrice = itemDTO.CostPrice;
            item.WareHouse_Id = itemDTO.WareHouse_Id;
            context.WareHouseItems.Attach(item);
            context.WareHouseItems.Entry(item).State = EntityState.Modified;
            context.SaveChanges();
        }

        public List<WareHouseItemDTO> searchItemByName(string name)
        {

            List<WareHouseItem> items = context.WareHouseItems.Include("WareHouse").Where(w => w.Name.Contains(name) || w.WareHouse.Name.Contains(name)).ToList();
            List<WareHouseItemDTO> itemDTOs = new List<WareHouseItemDTO>();
            foreach (WareHouseItem item in items)
            {
                WareHouseItemDTO itemDTO = new WareHouseItemDTO();
                itemDTO.Id = item.Id;
                itemDTO.Name = item.Name;
                itemDTO.Code = item.Code;
                itemDTO.Qty = item.Qty;
                itemDTO.CostPrice = item.CostPrice;
                itemDTO.WareHouse_Id = item.WareHouse_Id;
                itemDTO.ware = new WareHouseDTO();
                itemDTO.ware.Name = item.WareHouse.Name;
                itemDTOs.Add(itemDTO);
            }
            return itemDTOs;

        }
    }
}
