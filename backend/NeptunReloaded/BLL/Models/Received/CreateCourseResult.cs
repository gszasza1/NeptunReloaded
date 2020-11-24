using NeprunReloaded.DAL.Entities;
using NeptunReloaded.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace NeptunReloaded.BLL.Models.Received
{
    public class CreateCourseResult
    {
        public int UserId { get; set; }
        public int ExamId { get; set; }
        public int Score { get; set; }
    }
}
