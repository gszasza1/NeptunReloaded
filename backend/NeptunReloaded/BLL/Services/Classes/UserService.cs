using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using NeptunReloaded.BLL.Models.Received;
using NeptunReloaded.BLL.Models.Send;
using NeptunReloaded.BLL.Services.Interfaces;
using NeptunReloaded.DAL;
using NeptunReloaded.DAL.Entities;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace NeptunReloaded.BLL.Services.Classes
{
    public class UserService : IUserService
    {
        private readonly NeptunReloadedDatabaseContext _context;
        private readonly IConfiguration _config;

        public UserService(NeptunReloadedDatabaseContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public async Task changeName(int? userId, string newName)
        {
            var currentUser = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);
            if (userId == null || currentUser == null)
            {
                throw new InvalidOperationException("Nem létezik a felhasználó");
            }

            currentUser.Username = newName;
            _context.Update(currentUser);
            await _context.SaveChangesAsync();
            return;
        }

        public async Task changePassword(int? userId, string newPassword)
        {
            var currentUser = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);
            if (userId == null || currentUser == null)
            {
                throw new InvalidOperationException("Nem létezik a felhasználó");
            }
            currentUser.Password = newPassword;
            _context.Update(currentUser);
            await _context.SaveChangesAsync();
            return;
        }
        public async Task changeUserRole(int? userId, string role)
        {
            var currentUser = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);
            if (userId == null || currentUser == null)
            {
                throw new InvalidOperationException("Nem létezik a felhasználó");
            }
            currentUser.Role = role;
            _context.Update(currentUser);
            await _context.SaveChangesAsync();
            return;
        }

        public async Task<IEnumerable<MinimalUser>> GetAllUser()
        {
            return await _context.Users.Select(x => new MinimalUser() { Id = x.Id, Username = x.Username,Role=x.Role }).ToListAsync();
        }

        public async Task<IEnumerable<MinimalUser>> GetAllUserInCourse(int courseId)
        {
           
            return await _context.Users
                .Include(t=>t.UserCourses)
                .Where(s=>s.UserCourses
                    .Any(q=>q.CourseId==courseId))
                .Select(m=>new MinimalUser() {
                    Id=m.Id,
                    Role=m.Role,
                    Username=m.Username
                })
                .ToListAsync();
        }

        public async Task<string> loginUser(LoginUser loginCredentials)
        {
            if (loginCredentials.Username == null || loginCredentials.Password == null)
            {
                throw new InvalidOperationException("Hibás bemenet");
            }
            User auth = await _context.Users.SingleOrDefaultAsync(x => x.Username == loginCredentials.Username && x.Password == loginCredentials.Password);
            if (auth == null)
            {
                throw new InvalidOperationException("Nincs ilyen felhasználó");
            }

            return GenerateJWTToken(auth);

        }

        public async Task<User> registerUser(RegisterUser user)
        {
            if (user.firstName == null || user.lastName == null || user.username == null || user.neptun == null || user.password == null)
            {
                throw new InvalidOperationException("Hibás bemenet");
            }
            List<User> users = await _context.Users.Where(u => u.Neptun == user.neptun || user.username==u.Username).ToListAsync();

            //Check if neptun or username is already in use
            if (users.Count > 0)
            {
                throw new InvalidOperationException("Létező felhasználó");  
            }

            var  dbUser = user.mapToDBUser();

            await _context.Users.AddAsync(dbUser);
            await _context.SaveChangesAsync();

            return dbUser;
        }

        public async Task<User> viewProfile(int? userId)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id.Equals(userId));
        }
       private string GenerateJWTToken(User userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("Jwt").GetSection("SecretKey").Value));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[] {
        new Claim(JwtRegisteredClaimNames.Sub, userInfo.Id.ToString()),
        new Claim(ClaimTypes.Name, userInfo.Username),
        new Claim(ClaimTypes.Role, userInfo.Role),
        new Claim("id",  userInfo.Id.ToString()),
        new Claim("createdAt", userInfo.CreatedAt.ToString()),
        new Claim("firstName", userInfo.FirstName),
        new Claim("lastName", userInfo.LastName),
        new Claim("valid", DateTime.Now.ToString()),
      };
            var token = new JwtSecurityToken(
                issuer: _config.GetSection("Jwt").GetSection("Issuer").Value,
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: credentials
                );

            var tokenHandler = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenHandler;
        }
    }
}
