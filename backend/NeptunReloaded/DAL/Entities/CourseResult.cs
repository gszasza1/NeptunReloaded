using DataAnnotationsExtensions;
using NeptunReloaded.DAL.Entities;
using System;
using System.ComponentModel.DataAnnotations;

namespace NeprunReloaded.DAL.Entities
{
    public class CourseResult
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int CourseId { get; set; }
        public Course Course { get; set; }
        [Required]
        public int UserId { get; set; }
        public User User { get; set; }
        [Required]
        [Min(0)]
        [Max(100)]
        public int Score { get; set; } = -1;
        public bool IsDeleted { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
