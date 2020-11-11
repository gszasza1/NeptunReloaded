using NeptunReloaded.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace NeptunReloaded.BLL.Models.Received
{
    public class RegisterUser
    {
        public string username { get; set; }

        public string firstName { get; set; }

        public string lastName { get; set; }

        public string neptun { get; set; }

        public string password { get; set; }

        public User mapToDBUser() {

            return new User
            {
                Username = username,
                FirstName = firstName,
                LastName = lastName,
                Neptun = neptun,
                Password = password,
                CreatedAt = DateTime.UtcNow
            };
        }

    }
}
