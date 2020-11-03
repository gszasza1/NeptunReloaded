using System;
using System.ComponentModel.DataAnnotations;
namespace NeptunReloaded.DAL.Entities
{
    public class User
    {
        [Key]
        public  int Id { get; set; }
        [Required]
        [MinLength(2)]
        public string Username { get; set; }

        [Required]
        [MinLength(2)]
        public string FirstName { get; set; }

        [Required]
        [MinLength(2)]
        public string LastName { get; set; }

        [Required]
        [StringLength(6)]
        public string Neptun { get; set; }

        [Required]
        public string Password { get; set; }
        [Required]
        public bool IsTeacher { get; set; } = false;

        public bool IsDeleted { get; set; } = false;

        public DateTime CreatedAt { get; set; } = new DateTime();
    }
   
}
