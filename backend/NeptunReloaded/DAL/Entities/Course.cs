using NeptunReloaded.DAL.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NeprunReloaded.DAL.Entities
{
   public class Course
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
        public int? UserId { get; set; }
        public User User { get; set; }

        public virtual ICollection<UserCourse> UserCourses { get; set; }
        public virtual ICollection<Exam> Exams { get; set; }

        public bool IsDeleted { get; set; } = false;
      
        public DateTime CreatedAt { get; set; } = new DateTime();
    }
}
