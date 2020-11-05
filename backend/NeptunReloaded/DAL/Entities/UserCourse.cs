using NeptunReloaded.DAL.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace NeprunReloaded.DAL.Entities
{
   public  class UserCourse
    {
       
 
        public int? UserId { get; set; }
        public User User { get; set; }
     
        public int? CourseId { get; set; }
        public Course Course { get; set; }
    }
}
