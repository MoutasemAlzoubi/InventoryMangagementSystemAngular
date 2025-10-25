using InventoryManagementAPI.Data;
using InventoryManagementAPI.Model;
using Microsoft.AspNetCore.Identity;

namespace InventoryManagementAPI.Service
{
    public interface IAccountService
    {
        Task<IdentityResult> CreateAccount(SignUp user);
        Task<SignInResult> LogIn(SignInModel signIn);
        Task<List<SignUp>> UsersList();
        Task<IdentityResult> DeleteUser(string UserId);
        Task<SignUp> EditUser(string UserId);
        Task<IdentityResult> UpdateUser(SignUp sign);
        Task<List<SignUp>> SearchByName(string name);
        Task<ApplicationUser> SearchUserByUserName(string username);
        Task<List<string>> GetRoleByUserNameAsync(ApplicationUser user);




        Task<IdentityResult> AddRole(RoleModel role);
        Task<List<RoleModel>> GetRoles();
        Task<IdentityResult> DeleteRole(string RoleId);
        Task<RoleModel> EditRole(string RoleId);
        Task<IdentityResult> UpdateRole(RoleModel roleModel);
        Task<List<RoleModel>> SearchByRoleName(string name);
        Task LogOut();
    }
}
