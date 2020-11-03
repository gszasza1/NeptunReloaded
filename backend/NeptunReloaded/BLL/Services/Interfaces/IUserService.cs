using NeptunReloaded.BLL.Models.Received;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NeptunReloaded.BLL.Services.Interfaces
{
    public interface IUserService
    {
        public Task registerUser(RegisterUser user);
    }
}
