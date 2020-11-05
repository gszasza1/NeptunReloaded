using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NeprunReloaded.DAL.Entities
{
    public class Exam
    {
      
        public int Id { get; set; }
       
        public string Name { get; set; }
        
        public int CourseId { get; set; }
        public Course Course { get; set; }
    
        public bool IsDeleted { get; set; } = false;
      
        public DateTime CreatedAt { get; set; } = new DateTime();
    }
}
