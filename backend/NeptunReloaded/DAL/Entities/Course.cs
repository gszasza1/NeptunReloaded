using NeptunReloaded.DAL.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace NeprunReloaded.DAL.Entities
{
   public class Course
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
        public int? UserId { get; set; }
        public User User { get; set; }
        public int? SubjectId { get; set; }
        public Subject Subject { get; set; }
        public int? RoomId { get; set; }
        public Room Room { get; set; }

        [JsonIgnore]
        public virtual ICollection<UserCourse> UserCourses { get; set; }
        [JsonIgnore]
        public virtual ICollection<Exam> Exams { get; set; }

        [JsonIgnore]
        public virtual ICollection<CourseResult> CourseResults { get; set; }

        public bool IsDeleted { get; set; } = false;
      
        public DateTime CreatedAt { get; set; } = new DateTime();
    }
}
