using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace NeprunReloaded.DAL.Entities
{
   public class Room
    {
        public int Id { get; set; }
  
        public string Name { get; set; }
     
        public bool IsDeleted { get; set; } = false;
   
        public DateTime CreatedAt { get; set; } = new DateTime();
    }
}
