using InventoryManagementAPI.Model;

namespace InventoryManagementAPI.Service
{
    public interface IItemService
    {
        void SaveItem(WareHouseItemDTO itemDTO);
        List<WareHouseItemDTO> ItemList();
        void DeleteItem(int ItemId);
        WareHouseItemDTO EditItem(int ItemId);
        void UpdateItem(WareHouseItemDTO itemDTO);
        List<WareHouseItemDTO> searchItemByName(string name);
    }
}
