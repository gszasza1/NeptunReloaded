using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace NeprunReloaded.DAL.Entities
{
    public class Exam
    {
        [Key]
        public int Id { get; set; }
        public int CourseId { get; set; }
        public Course Course { get; set; }
        [Required]
        [MinLength(2)]
        public string Name { get; set; } = "Default name";

        [JsonIgnore]
        public virtual ICollection<UserExam> UserExams { get; set; }
        public bool IsDeleted { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
