using NeptunReloaded.BLL.Models.Received;
using NeptunReloaded.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NeptunReloaded.BLL.Services.Interfaces
{
    public interface IUserService
    {
        public Task<User> registerUser(RegisterUser user);
        public Task<User> loginUser(LoginUser user);
        public Task<User> changePassword(LoginUser user, String newPassword);
        public Task<User> changeName(LoginUser user, String newName);
        public Task<User> viewProfile(LoginUser user);
        
    }

}
