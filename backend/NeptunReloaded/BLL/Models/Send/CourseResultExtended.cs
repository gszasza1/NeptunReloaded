using System;
using System.Collections.Generic;
using System.Text;

namespace NeptunReloaded.BLL.Models.Send
{
   public class CourseResultExtended
    {
        public int Id { get; set; }
        public int Score { get; set; }

        public string Neptun { get; set; }
        public string CourseName { get; set; }
        public DateTime CreatedAt { get; set; }

    }
}
