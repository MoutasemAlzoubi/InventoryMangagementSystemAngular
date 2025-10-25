using InventoryManagementAPI.Data;
using InventoryManagementAPI.Model;
using InventoryManagementAPI.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        ICityService cityService;
        ICountryService countryService;
        public CityController(ICityService _cityService, ICountryService _countryService)
        {
            cityService = _cityService;
            countryService = _countryService;
        }


        [HttpPost]
        public void Save(CityDTO cityDTO)
        {
            cityService.Insert(cityDTO);
        }


        [HttpGet]
        [Route("LoadAll")]
        public List<CityDTO> CityList()
        {
            List<CityDTO> citiesDTO = cityService.getAllCities();
            return citiesDTO;
        }



        [HttpGet]
        [Route("LoadAllBySearch")]
        public List<CityDTO> SearchByName(string Name)
        {
            List<CityDTO> dTOs = cityService.searchByName(Name);
            return dTOs;
        }




        [HttpDelete]
        public void DeleteCity(int Id)
        {
            cityService.Delete(Id);
        }




        [HttpGet]
        [Route("Load")]
        public CityDTO EditCity(int Id)
        {
            CityDTO cityDTO = cityService.Edit(Id);
            return cityDTO;
        }



        [HttpPut]
        public void UpdateCity(CityDTO cityDTO)
        {
            cityService.Update(cityDTO);
            
        }
    }
}
