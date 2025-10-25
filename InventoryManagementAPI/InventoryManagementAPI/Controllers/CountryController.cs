using InventoryManagementAPI.Model;
using InventoryManagementAPI.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = "Admin,Manager,Employee")]

    public class CountryController : ControllerBase
    {

        ICountryService countryService;
        public CountryController(ICountryService _countryService)
        {
            countryService = _countryService;
        }
        [HttpPost]
        [Route("Save")]
        public void Save(CountryDTO country)
        {
            countryService.Insert(country);

        }
        [HttpGet]
        [Route("LoadAll")]
        public List<CountryDTO> CountryList()
        {
            List<CountryDTO> countries = countryService.getAllCountries();
            return countries;
        }
        [HttpDelete]
        public void Delete(int Id)
        {
            countryService.Delete(Id);

        }
        [HttpGet]
        [Route("Edit")]
        public CountryDTO Edit(int CountryId)
        {
            CountryDTO countryDTO = countryService.Edit(CountryId);
            return countryDTO;
        }
        [HttpPut]
        public void Update(CountryDTO country)
        {
            countryService.Update(country);


        }
        [HttpGet]
        [Route("Load")]
        public List<CountryDTO> SearchCountry(string name)
        {
            List<CountryDTO> countries = countryService.SearchCountry(name);
            return countries;

        }
    }
}

