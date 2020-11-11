using NeprunReloaded.DAL.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace NeptunReloaded.DAL.Entities
{
    public class User
    {
        [Key]
        public  int Id { get; set; }

        public string Username { get; set; }

        public string FirstName { get; set; }
        
        public string LastName { get; set; }
         
        public string Neptun { get; set; }

        public string Password { get; set; }

        public bool IsTeacher { get; set; } = false;

        public virtual ICollection<UserCourse> UserCourses { get; set; }
        public virtual ICollection<ExamResult> ExamResults { get; set; }
        public virtual ICollection<Course> Courses { get; set; }

        public bool IsDeleted { get; set; } = false;
      
        public DateTime CreatedAt { get; set; } = new DateTime();

    }
   
}
