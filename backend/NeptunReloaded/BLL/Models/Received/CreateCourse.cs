using NeprunReloaded.DAL.Entities;
using NeptunReloaded.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace NeptunReloaded.BLL.Models.Received
{
    public class CreateCourse
    {
        public string Name { get; set; }
        
        public int SubjectId { get; set; }
        
        public int RoomId { get; set; }
               
    }
}
