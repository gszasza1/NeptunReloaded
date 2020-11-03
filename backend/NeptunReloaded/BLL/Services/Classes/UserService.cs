using AutoMapper;
using NeptunReloaded.BLL.Models.Received;
using NeptunReloaded.BLL.Services.Interfaces;
using NeptunReloaded.DAL;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NeptunReloaded.BLL.Services.Classes
{
    public class UserService : IUserService
    {
        private readonly NeptunReloadedDatabaseContext _context;
        private readonly IMapper _mapper;

    

        public UserService(NeptunReloadedDatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task registerUser(RegisterUser user)
        {

            //await _context.Users
            // .Add(b => _mapper.Map<RegisterUser, User>(b));
          

            await _context.SaveChangesAsync();
        }
       
    }
}
