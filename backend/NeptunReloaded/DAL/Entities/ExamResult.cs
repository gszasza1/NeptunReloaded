using NeptunReloaded.DAL.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace NeprunReloaded.DAL.Entities
{
   public class ExamResult
    {

     
        public int Id { get; set; }
      
        public int Score { get; set; }


        public int UserId { get; set; }
        public User User { get; set; }
    

        public int ExamId { get; set; }
        public Exam Exam { get; set; }
     
        public bool IsDeleted { get; set; } = false;
     
        public DateTime CreatedAt { get; set; } = new DateTime();
    }
}
