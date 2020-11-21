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
        public Task<string> loginUser(LoginUser user);
        public Task changePassword(int? userId, string newPassword);
        public Task changeName(int? userId, string newName);
        public Task<User> viewProfile(int? userId);  
    }

}
