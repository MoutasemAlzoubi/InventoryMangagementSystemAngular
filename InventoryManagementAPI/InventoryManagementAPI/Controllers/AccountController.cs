using InventoryManagementAPI.Model;
using InventoryManagementAPI.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace InventoryManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        IAccountService accountService;
        IConfiguration configuration;

        public AccountController(IAccountService _accountService,IConfiguration _configuration)
        {
            accountService = _accountService;
            configuration = _configuration;

        }




        //[Authorize(Roles = "Admin,Manager")]
        [HttpPost]
        [Route("CreateAccount")]
        public async Task CreateAccount(SignUp signUp)
        {

            var result = await accountService.CreateAccount(signUp);
           

        }






        //[Authorize(Roles = "Admin,Manager,Employee")]
        [HttpPost]
        [Route("LogIn")]
        public async Task<IActionResult> LogIn(SignInModel model)
        {
            var Result = await accountService.LogIn(model);
            if (Result.Succeeded)
            {
                List<Claim> authClaim = new List<Claim>()
                {
                    new Claim(ClaimTypes.Name, model.UserName), 
                    new Claim("uniqueValue", Guid.NewGuid().ToString())
                };
                var user = await accountService.SearchUserByUserName(model.UserName);
                List<string> roles = await accountService.GetRoleByUserNameAsync(user);
                foreach (string item in roles)
                {
                    Claim role = new Claim(ClaimTypes.Role, item);
                    authClaim.Add(role);

                }
                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));
                var token = new JwtSecurityToken(
                    issuer: configuration["JWT:ValidIssuer"], audience: configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddDays(15),
                    claims: authClaim,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));
                return Ok
                    (new { token = new JwtSecurityTokenHandler().WriteToken(token),
                        Name = user.Name,
                        roles = roles
                    });



            }
            else
            {
                return Unauthorized();
            }

        }







        //[Authorize(Roles = "Admin,Manager")]
        [HttpGet]
        [Route("LoadAllUsers")]
        public async Task<List<SignUp>> UserList()
        {
            List<SignUp> listUsers = await accountService.UsersList();

            return listUsers;
        }






        //[Authorize(Roles = "Admin,Manager")]
        [HttpDelete]
        [Route("DeleteUser")]
        public async Task DeleteUser(string UserId)
        {
            await accountService.DeleteUser(UserId);
            

        }





        //[Authorize(Roles = "Admin,Manager")]
        [HttpGet]
        [Route("EditUser")]
        public async Task<SignUp> EditUser(string UserId)
        {
            SignUp signUp = new SignUp();
            //List<SignUp> listUsers = await accountService.UsersList();
            signUp = await accountService.EditUser(UserId);
            return signUp;
        }








        //[Authorize(Roles = "Admin,Manager")]
        [HttpPut]
        [Route("UpdateUser")]
        public async Task UpdateUser(SignUp signUp)
        {
            await accountService.UpdateUser(signUp);
        }






        //[Authorize(Roles = "Admin,Manager")]
        [HttpGet]
        [Route("LoadAllByName")]
        public async Task<List<SignUp>> SearchByUserName(string name)
        {
            List<SignUp> listUsers = await accountService.SearchByName(name);


            return listUsers;
        }








        //[Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("AddRole")]
        public async Task SaveRole(RoleModel role)
        {
            await accountService.AddRole(role);

        }






        //[Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("RoleList")]
        public async Task<List<RoleModel>> RoleList()
        {

            List<RoleModel> Results = await accountService.GetRoles();
            return Results;
        }








        //[Authorize(Roles = "Admin")]
        [HttpDelete]
        [Route("DeleteRole")]
        public async Task DeleteRole(string RoleId)
        {
             await accountService.DeleteRole(RoleId);

        }






        //[Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("EditRole")]
        public async Task<RoleModel> EditRole(string RoleId)
        {

            var result = await accountService.EditRole(RoleId);

            return result;
        }


        //[Authorize(Roles = "Admin")]
        [HttpPut]
        [Route("UpdateRole")]
        public async Task UpdateRole(RoleModel roleModel)
        {
            await accountService.UpdateRole(roleModel);
        }


        //[Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("SearchRoleByName")]
        public async Task<List<RoleModel>> SearchRole(string Name)
        {
            var models = await accountService.SearchByRoleName(Name);


            return models;
        }






        //[Authorize(Roles = "Admin,Manager,Employee")]
        [ValidateAntiForgeryToken]
        public void LogOut()   //maybe thire is some misstake
        {
            accountService.LogOut();
           
        }
    }
}
