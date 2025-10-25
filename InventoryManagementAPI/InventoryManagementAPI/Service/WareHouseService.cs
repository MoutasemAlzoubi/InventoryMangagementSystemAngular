using InventoryManagementAPI.Data;
using InventoryManagementAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementAPI.Service
{
    public class WareHouseService: IWareHouseService
    {

        InventoryContext context;
        public WareHouseService(InventoryContext _context)
        {
            context = _context;

        }
        public void Save(WareHouseDTO houseDTO)
        {
            WareHouse house = new WareHouse();
            house.Name = houseDTO.Name;
            house.Description = houseDTO.Description;
            house.Country_Id = houseDTO.Country_Id;
            house.City_Id = houseDTO.City_Id;
            context.WareHouses.Add(house);
            context.SaveChanges();

        }
        public List<WareHouseDTO> WareHouseList()
        {
            List<WareHouse> houses = context.WareHouses.Include("Country")
                                     .Include("City").ToList();
            List<WareHouseDTO> houseDTOs = new List<WareHouseDTO>();
            foreach (WareHouse ware in houses)
            {
                WareHouseDTO dTO = new WareHouseDTO();
                dTO.Id = ware.Id;
                dTO.Name = ware.Name;
                dTO.Description = ware.Description;
                dTO.Country_Id = ware.Country_Id;
                dTO.City_Id = ware.City_Id;
                dTO.country = new CountryDTO();
                dTO.country.Name = ware.Country.Name;
                dTO.city = new CityDTO();
                dTO.city.Name = ware.City.Name;
                houseDTOs.Add(dTO);

            }
            return houseDTOs;
        }

        public void deleteWareHouse(int WareHouseId)
        {
            WareHouse wareHouse = context.WareHouses.Where(w => w.Id == WareHouseId).FirstOrDefault();
            context.WareHouses.Remove(wareHouse);
            context.SaveChanges();
        }
        public WareHouseDTO editWareHouse(int WareHouseId)
        {
            WareHouse wareHouse = context.WareHouses.Include("Country")
            .Include("City").Where(w => w.Id == WareHouseId).FirstOrDefault();
            WareHouseDTO wareHouseDTO = new WareHouseDTO();
            wareHouseDTO.Id = wareHouse.Id;
            wareHouseDTO.Name = wareHouse.Name;
            wareHouseDTO.Description = wareHouse.Description;
            wareHouseDTO.Country_Id = wareHouse.Country_Id;
            wareHouseDTO.City_Id = wareHouse.City_Id;
            wareHouseDTO.country = new CountryDTO();
            wareHouseDTO.country.Name = wareHouse.Country.Name;
            wareHouseDTO.city = new CityDTO();
            wareHouseDTO.city.Name = wareHouse.City.Name;
            return wareHouseDTO;
        }
        public void updateWareHouse(WareHouseDTO wareHouseDTO)
        {
            WareHouse wareHouse = new WareHouse();
            wareHouse.Id = wareHouseDTO.Id;
            wareHouse.Name = wareHouseDTO.Name;
            wareHouse.Description = wareHouseDTO.Description;
            wareHouse.Country_Id = wareHouseDTO.Country_Id;
            wareHouse.City_Id = wareHouseDTO.City_Id;
            context.WareHouses.Attach(wareHouse);
            context.Entry(wareHouse).State = EntityState.Modified;
            context.SaveChanges();
        }

        public List<WareHouseDTO> searchWareHouseByName(string name)
        {
            List<WareHouse> wareHouses = context.WareHouses.Include("Country")
            .Include("City").Where(w => w.Name.Contains(name)).ToList();
            List<WareHouseDTO> wareHouseDTOs = new List<WareHouseDTO>();
            foreach (WareHouse wareHouse in wareHouses)
            {
                WareHouseDTO wareHouseDTO = new WareHouseDTO();
                wareHouseDTO.Id = wareHouse.Id;
                wareHouseDTO.Name = wareHouse.Name;
                wareHouseDTO.Description = wareHouse.Description;
                wareHouseDTO.Country_Id = wareHouse.Country_Id;
                wareHouseDTO.City_Id = wareHouse.City_Id;
                wareHouseDTO.country = new CountryDTO();
                wareHouseDTO.country.Name = wareHouse.Country.Name;
                wareHouseDTO.city = new CityDTO();
                wareHouseDTO.city.Name = wareHouse.City.Name;
                wareHouseDTOs.Add(wareHouseDTO);
            }
            return wareHouseDTOs;

        }
    }
}
