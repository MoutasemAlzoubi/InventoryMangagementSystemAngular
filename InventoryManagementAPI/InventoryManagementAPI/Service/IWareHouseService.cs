using InventoryManagementAPI.Model;

namespace InventoryManagementAPI.Service
{
    public interface IWareHouseService
    {
        void Save(WareHouseDTO houseDTO);
        List<WareHouseDTO> WareHouseList();
        void deleteWareHouse(int WareHouseId);
        WareHouseDTO editWareHouse(int WareHouseId);
        void updateWareHouse(WareHouseDTO wareHouseDTO);
        List<WareHouseDTO> searchWareHouseByName(string name);
    }
}
