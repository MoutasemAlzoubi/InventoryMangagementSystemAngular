using InventoryManagementAPI.Model;

namespace InventoryManagementAPI.Service
{
    public interface ICityService
    {
        void Insert(CityDTO cityDTO);
        List<CityDTO> getAllCities();
        List<CityDTO> searchByName(string Name);
        void Delete(int CityId);
        public CityDTO Edit(int CityId);
        void Update(CityDTO cityDTO);
    }
}
