using InventoryManagementAPI.Data;
using InventoryManagementAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementAPI.Service
{
    public class CityService: ICityService
    {
        InventoryContext context;
        public CityService(InventoryContext _context)
        {
            context = _context;
        }
        public void Insert(CityDTO cityDTO)
        {
            City city = new City();
            //city.Id = cityDTO.Id;
            city.Name = cityDTO.Name;
            city.Country_Id = cityDTO.Country_Id;
            context.Cities.Add(city);
            context.SaveChanges();
        }
        public List<CityDTO> getAllCities()
        {
            List<City> cities = context.Cities.Include("Country").ToList();

            List<CityDTO> cityDTOs = new List<CityDTO>();

            foreach (City city in cities)
            {
                CityDTO cityDTO = new CityDTO();
                cityDTO.Id = city.Id;
                cityDTO.Name = city.Name;
                //cityDTO.Country_Id = city.Country_Id;
                cityDTO.Country = new CountryDTO();
                //cityDTO.Country.Id = city.Country.Id;
                //cityDTO.Country.Code = city.Country.Code;
                cityDTO.Country.Name = city.Country.Name;

                cityDTOs.Add(cityDTO);
            }

            return cityDTOs;
        }
        public List<CityDTO> searchByName(string Name)
        {

            List<City> citys = context.Cities.Include("Country").Where(c => c.Name.Contains(Name) || c.Country.Name.Contains(Name)).ToList();
            List<CityDTO> cityDTOs = new List<CityDTO>();
            foreach (City city in citys)
            {
                CityDTO cityDTO = new CityDTO();
                cityDTO.Id = city.Id;
                cityDTO.Name = city.Name;
                cityDTO.Country = new CountryDTO();
                cityDTO.Country.Name = city.Country.Name;
                cityDTOs.Add(cityDTO);


            }
            return cityDTOs;
        }
        public void Delete(int CityId)
        {
            CityDTO cityDTO = new CityDTO();
            City city = context.Cities.Where(c => c.Id == CityId).FirstOrDefault();
            context.Cities.Remove(city);
            context.SaveChanges();

        }
        public CityDTO Edit(int CityId)
        {
            City city = context.Cities.Include("Country").Where(c => c.Id == CityId).FirstOrDefault();
            CityDTO cityDTO = new CityDTO();
            cityDTO.Id = city.Id;
            cityDTO.Name = city.Name;
            cityDTO.Country_Id = city.Country_Id;
            cityDTO.Country = new CountryDTO();
            cityDTO.Country.Name = city.Country.Name;
            return cityDTO;
        }
        public void Update(CityDTO cityDTO)
        {
            City city = new City();
            city.Id = cityDTO.Id;
            city.Name = cityDTO.Name;
            city.Country_Id = cityDTO.Country_Id;
            context.Cities.Attach(city);
            context.Entry(city).State = EntityState.Modified;
            context.SaveChanges();


        }
    }
}
