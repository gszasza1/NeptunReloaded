using NeptunReloaded.DAL.Entities;
using System;
namespace NeprunReloaded.DAL.Entities
{
   public class UserExam
    {
        public int? UserId { get; set; }
        public User User { get; set; }

        public int? ExamId { get; set; }
        public Exam Exam { get; set; }
        public bool IsDeleted { get; set; } = false;
        public DateTime CreatedAt { get; set; } = new DateTime();
    }
}

