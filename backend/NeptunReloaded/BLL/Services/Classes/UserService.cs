using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NeptunReloaded.BLL.Models.Received;
using NeptunReloaded.BLL.Services.Interfaces;
using NeptunReloaded.DAL;
using NeptunReloaded.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NeptunReloaded.BLL.Services.Classes
{
    public class UserService : IUserService
    {
        private readonly NeptunReloadedDatabaseContext _context;
       
        public UserService(NeptunReloadedDatabaseContext context)
        {
            _context = context;
        }

        public async Task<User> changeName(LoginUser user, string newName)
        {
            User dbUser = null;

            try
            {
                dbUser = (User)_context.Users.ToList<User>().Find(u => u.Neptun == user.neptun);

                if (dbUser != null)
                {
                    dbUser.FirstName = newName;
                    _context.Update(dbUser);
                    _context.SaveChanges();
                }
            }
            catch (ArgumentNullException) { }
         
            return await Task.FromResult(dbUser);
        }

        public async Task<User> changePassword(LoginUser user, string newPassword)
        {
            User dbUser = null;

            try
            {
                dbUser = (User)_context.Users.ToList<User>().Find(u => u.Neptun == user.neptun);

                if (dbUser != null)
                {
                    dbUser.Password = newPassword;
                    _context.Update(dbUser);
                    _context.SaveChanges();
                }
            }
            catch (ArgumentNullException) { }

            return await Task.FromResult(dbUser);
        }

        public async Task<User> loginUser(LoginUser user)
        {
            User dbUser = null;

            try
            {
                dbUser = _context.Users.ToList<User>().Find(u => u.Neptun == user.neptun && u.Password == user.password);

            }
            catch (ArgumentNullException) { }

            return await Task.FromResult(dbUser);
        }

        public async Task<User> registerUser(RegisterUser user)
        {
            if (user.firstName == null || user.lastName == null || user.username == null || user.neptun == null || user.password == null)
            {
                throw new InvalidOperationException("Hibás bemenet");
            }
            User dbUser;

            List<User> users =await _context.Users.Where(u=>u.Neptun==user.neptun).ToListAsync();
            
            //Check if neptun is already in use
            if (users.Count > 0)
            {
              throw new InvalidOperationException("Létező felhasználó");  //return null as user if registration was unsuccessful, else return registered user
            }

           dbUser = user.mapToDBUser();

           await _context.Users.AddAsync(dbUser);
           await _context.SaveChangesAsync();

           return dbUser;
        }

        public async Task<User> viewProfile(LoginUser user)
        {
            User dbUser = null;
            try
            {
                dbUser = (User)_context.Users.ToList<User>().Find(u => u.Neptun == user.neptun);
            }
            catch (ArgumentNullException) { }

            return await Task.FromResult(dbUser);
        }
    }
}
