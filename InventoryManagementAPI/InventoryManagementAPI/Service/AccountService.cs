using InventoryManagementAPI.Data;
using InventoryManagementAPI.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace InventoryManagementAPI.Service
{
    public class AccountService: IAccountService
    {

        UserManager<ApplicationUser> userManager;
        SignInManager<ApplicationUser> signInManager;
        RoleManager<IdentityRole> roleManager;

        public AccountService(UserManager<ApplicationUser> _userManager,
            SignInManager<ApplicationUser> _signInManager,
            RoleManager<IdentityRole> _roleManager)
        {
            userManager = _userManager;
            signInManager = _signInManager;
            roleManager = _roleManager;
        }

        // Create a new account with role
        public async Task<IdentityResult> CreateAccount(SignUp user)
        {
            ApplicationUser applicationUser = new ApplicationUser();
            applicationUser.Name = user.Name;
            applicationUser.UserName = user.UserName;

            var Create = await userManager.CreateAsync(applicationUser, user.Password);

            if (Create.Succeeded)
            {
                var newRole = await userManager.AddToRoleAsync(applicationUser, user.RoleName);
                if (!newRole.Succeeded)
                {
                    // Rollback if role assignment fails
                    await userManager.DeleteAsync(applicationUser);
                }
            }
            return Create;
        }

        // Login using username and password
        public async Task<SignInResult> LogIn(SignInModel signIn)
        {
            var result = await signInManager.PasswordSignInAsync(signIn.UserName, signIn.Password, false, false);
            return result;
        }

        // Get all users with roles
        public async Task<List<SignUp>> UsersList()
        {
            var users = await userManager.Users.ToListAsync();
            List<SignUp> signUp = new List<SignUp>();

            foreach (ApplicationUser applicationUser in users)
            {
                SignUp sign = new SignUp();
                sign.Id = applicationUser.Id;
                sign.UserName = applicationUser.UserName;
                sign.Name = applicationUser.Name;

                var roles = await userManager.GetRolesAsync(applicationUser);
                sign.RoleName = string.Join(", ", roles);
                signUp.Add(sign);
            }

            return signUp;
        }

        // Delete user by Id
        public async Task<IdentityResult> DeleteUser(string UserId)
        {
            ApplicationUser user = await userManager.Users.Where(U => U.Id == UserId).FirstOrDefaultAsync();
            var result = await userManager.DeleteAsync(user);
            if (result.Succeeded)
            {
                Console.WriteLine("User deleted successfully");
            }
            return result;
        }

        // Get user details for editing
        public async Task<SignUp> EditUser(string UserId)
        {
            ApplicationUser user = await userManager.Users.Where(U => U.Id == UserId).FirstOrDefaultAsync();
            SignUp signUp = new SignUp();
            signUp.Id = user.Id;
            signUp.Name = user.Name;
            signUp.UserName = user.UserName;

            var ApRole = await userManager.GetRolesAsync(user);
            signUp.RoleName = ApRole.FirstOrDefault();

            return signUp;
        }

        // Update user info and roles
        public async Task<IdentityResult> UpdateUser(SignUp sign)
        {
            var user = await userManager.FindByIdAsync(sign.Id);

            user.Name = sign.Name;
            user.UserName = sign.UserName;

            var currentRoles = await userManager.GetRolesAsync(user);
            if (currentRoles.Any())
                await userManager.RemoveFromRolesAsync(user, currentRoles);

            await userManager.AddToRoleAsync(user, sign.RoleName);

            return await userManager.UpdateAsync(user);
        }

        // Get role by UserName
        public async Task<List<string>> GetRoleByUserNameAsync(ApplicationUser user)
        {
            var roles = await userManager.GetRolesAsync(user);
            return roles.ToList();
        }

        //Search User by Username

        public async Task<ApplicationUser> SearchUserByUserName(string username)
        {
            var result = await userManager.FindByNameAsync(username);
            return result;

        }

        // Search users by name or role
        public async Task<List<SignUp>> SearchByName(string name)
        {
            var application = await userManager.Users.ToListAsync();
            List<SignUp> signUps = new List<SignUp>();

            foreach (ApplicationUser user in application)
            {
                var roles = await userManager.GetRolesAsync(user);

                if (user.Name.Contains(name) || roles.Any(r => r.Contains(name)))
                {
                    SignUp sign = new SignUp
                    {
                        Id = user.Id,
                        Name = user.Name,
                        UserName = user.UserName,
                        RoleName = string.Join(", ", roles)
                    };
                    signUps.Add(sign);
                }
            }

            return signUps;
        }




        // Add a new role
        public async Task<IdentityResult> AddRole(RoleModel role)
        {
            IdentityRole identityRole = new IdentityRole();
            identityRole.Name = role.Name;
            var result = await roleManager.CreateAsync(identityRole);
            return result;
        }

        // Get all roles
        public async Task<List<RoleModel>> GetRoles()
        {
            var listRoles = await roleManager.Roles.AsNoTracking().ToListAsync();
            List<RoleModel> roleModels = listRoles.Select(r => new RoleModel
            {
                Id = r.Id,
                Name = r.Name
            }).ToList();

            return roleModels;
        }


        // Delete role by Id
        public async Task<IdentityResult> DeleteRole(string RoleId)
        {
            IdentityRole identity = await roleManager.FindByIdAsync(RoleId);

            if (identity == null)
            {
                return IdentityResult.Failed(new IdentityError
                {
                    Description = $"Role with id {RoleId} not found."
                });
            }
            var result = await roleManager.DeleteAsync(identity);
            if (result.Succeeded)
            {
                Console.WriteLine("Role deleted successfully");
            }
            return result;
        }

        // Get role details for editing
        public async Task<RoleModel> EditRole(string RoleId)
        {
            IdentityRole identity = await roleManager.FindByIdAsync(RoleId);
            RoleModel roleModel = new RoleModel();
            roleModel.Id = identity.Id;
            roleModel.Name = identity.Name;
            return roleModel;
        }

        // Update role info
        public async Task<IdentityResult> UpdateRole(RoleModel roleModel)
        {
            var identity = await roleManager.FindByIdAsync(roleModel.Id);
            identity.Id = roleModel.Id;
            identity.Name = roleModel.Name;
            var result = await roleManager.UpdateAsync(identity);
            return result;
        }

        // Search roles by name
        public async Task<List<RoleModel>> SearchByRoleName(string name)
        {
            List<IdentityRole> identityRoles = await roleManager.Roles.Where(r => r.Name.Contains(name)).ToListAsync();
            List<RoleModel> roleModels = new List<RoleModel>();
            foreach (var role in identityRoles)
            {
                RoleModel model = new RoleModel();
                model.Name = role.Name;
                roleModels.Add(model);
            }
            return roleModels;
        }
  
        // Logout current user
        public async Task LogOut()
        {
            await signInManager.SignOutAsync();
        }

    }
}
