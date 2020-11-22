using NeprunReloaded.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace NeptunReloaded.BLL.Models.Send
{
    public class CoursesPopUp
    {
        public int Id { get; set; }
        public Subject Subject { get; set; }
        public Room Room { get; set; }
        public UserSelect User { get; set; }
        public bool Member { get; set; }
    }
}
