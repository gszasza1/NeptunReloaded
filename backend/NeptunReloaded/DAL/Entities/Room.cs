using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace NeprunReloaded.DAL.Entities
{
    public class Room
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MinLength(2)]
        public string Name { get; set; } = "Default name";

        public bool IsDeleted { get; set; } = false;

        public DateTime CreatedAt { get; set; } = new DateTime();
    }
}
