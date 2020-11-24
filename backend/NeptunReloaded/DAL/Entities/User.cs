using NeprunReloaded.DAL.Additional;
using NeprunReloaded.DAL.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

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

        [JsonIgnore]
        public string Password { get; set; }

        public string Role { get; set; } ="Student";

        [JsonIgnore]
        public virtual ICollection<UserCourse> UserCourses { get; set; }
        [JsonIgnore]
        public virtual ICollection<UserExam> UserExams { get; set; }
        [JsonIgnore]
        public virtual ICollection<ExamResult> ExamResults { get; set; }
        [JsonIgnore]
        public virtual ICollection<Course> Courses { get; set; }

        public bool IsDeleted { get; set; } = false;
      
        public DateTime CreatedAt { get; set; } = new DateTime();

       

    }
   
}
