using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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
        public virtual ICollection<ExamResult> ExamResults { get; set; }
        public bool IsDeleted { get; set; } = false;
        public DateTime CreatedAt { get; set; } = new DateTime();
    }
}
