using InventoryManagementAPI.Data;
using InventoryManagementAPI.Model;
using InventoryManagementAPI.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WareHouseController : ControllerBase
    {
        IWareHouseService wareHouseService;
        ICountryService countryService;
        ICityService cityService;
        public WareHouseController(IWareHouseService _wareHouseService,
            ICountryService _countryService,
            ICityService _cityService)
        {
            wareHouseService = _wareHouseService;
            countryService = _countryService;
            cityService = _cityService;
        }
        [HttpPost]
        public void SaveWareHouse(WareHouseDTO wareHouseDTO)
        {
            wareHouseService.Save(wareHouseDTO);
           
        }




        [HttpGet]
        [Route("LoadAll")]
        public List<WareHouseDTO> ListOfWareHouse()
        {
            List<WareHouseDTO> wareHouses = wareHouseService.WareHouseList();
            return wareHouses;
        }




        [HttpDelete]
        public void DeleteWareHouse(int WareHouseId)
        {
            wareHouseService.deleteWareHouse(WareHouseId);
        }





        [HttpGet]
        [Route("Load")]
        public WareHouseDTO EditWareHouse(int WareHouseId)
        {
            WareHouseDTO wareHouseDTO = wareHouseService.editWareHouse(WareHouseId);
            return wareHouseDTO;
        }




        [HttpPut]
        public void UpdateWareHouse(WareHouseDTO wareHouseDTO)
        {
            wareHouseService.updateWareHouse(wareHouseDTO);
        }





        [HttpGet]
        [Route("LoadAllByName")]
        public List<WareHouseDTO> SearchWareHouseByName(string name)
        {
            List<WareHouseDTO> wares = wareHouseService.searchWareHouseByName(name);
            return wares;
        }
    }
}
