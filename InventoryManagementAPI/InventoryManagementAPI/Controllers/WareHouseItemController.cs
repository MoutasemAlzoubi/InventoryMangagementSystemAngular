using InventoryManagementAPI.Model;
using InventoryManagementAPI.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WareHouseItemController : ControllerBase
    {
        IItemService itemService;
        IWareHouseService wareHouseService;
        public WareHouseItemController(IItemService _itemService, IWareHouseService _wareHouseService)
        {
            itemService = _itemService;
            wareHouseService = _wareHouseService;
        }



        //[Authorize(Roles = "Admin,Manager,Employee")]
        [HttpPost]
        public void SaveItem(WareHouseItemDTO itemDTO)
        {
            itemService.SaveItem(itemDTO);
        }






        //[Authorize(Roles = "Admin,Manager,Employee")]
        [HttpGet]
        [Route("LoadAll")]
        public List<WareHouseItemDTO> ItemList()
        {
            List<WareHouseItemDTO> itemDTOs = itemService.ItemList();
            return itemDTOs;
        }






        //[Authorize(Roles = "Admin,Manager,Employee")]
        [HttpDelete]
        public void DeleteItem(int ItemId)
        {
            itemService.DeleteItem(ItemId);
        }






        //[Authorize(Roles = "Admin,Manager,Employee")]
        [HttpGet]
        [Route("Load")]
        public WareHouseItemDTO EditItem(int ItemId)
        {
            WareHouseItemDTO itemDTO = new WareHouseItemDTO();
            itemDTO = itemService.EditItem(ItemId);
            return itemDTO;
        }






        //[Authorize(Roles = "Admin,Manager,Employee")]
        [HttpPut]
        public void UpdateItem(WareHouseItemDTO itemDTO)
        {
            itemService.UpdateItem(itemDTO);
        }






        //[Authorize(Roles = "Admin,Manager,Employee")]
        [HttpGet]
        [Route("LoadAllByName")]
        public List<WareHouseItemDTO> SearchItemByName(string name)
        {
            List<WareHouseItemDTO> itemDTOs = itemService.searchItemByName(name);
            return itemDTOs;

        }

    }
}
