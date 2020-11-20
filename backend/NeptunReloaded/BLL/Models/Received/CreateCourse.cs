using NeprunReloaded.DAL.Entities;
using NeptunReloaded.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace NeptunReloaded.BLL.Models.Received
{
    public class CreateCourse
    {

        public string Name { get; set; }
        
        public User User { get; set; }
        
        public Subject Subject { get; set; }
        
        public Room Room { get; set; }

        public Course mapToDBCourse() {

            return new Course
            {
                Name = this.Name,
                User = this.User,
                Subject = this.Subject,
                Room = this.Room,
                CreatedAt = DateTime.UtcNow,
                IsDeleted = false
            };
        }
    }
}
