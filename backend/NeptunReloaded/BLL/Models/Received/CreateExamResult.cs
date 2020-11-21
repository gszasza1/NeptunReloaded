using NeprunReloaded.DAL.Entities;
using NeptunReloaded.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace NeptunReloaded.BLL.Models.Received
{
    public class CreateExamResult
    {
        public Exam Exam { get; set; }
        public User User { get; set; }

        public ExamResult mapToDBExamResult() {

            return new ExamResult
            {
                Exam = this.Exam,
                ExamId = this.Exam.Id,
                User = this.User,
                UserId = this.User.Id,
                CreatedAt = DateTime.UtcNow
            };
        }
    }
}
