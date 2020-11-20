using NeprunReloaded.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace NeptunReloaded.BLL.Models.Received
{
    public class CreateExam
    {
        public Course Course { get; set; }
        public string Name { get; set; } = "Default name";

        public Exam mapToDBExam() {
            return new Exam
            {
                Name = this.Name,
                CourseId = this.Course.Id,
                Course = this.Course,
                CreatedAt = DateTime.UtcNow
            };
        }
    }
}
