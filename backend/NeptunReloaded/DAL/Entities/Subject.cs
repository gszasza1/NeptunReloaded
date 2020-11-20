using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.Json.Serialization;

namespace NeprunReloaded.DAL.Entities
{
  public class Subject
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MinLength(2)]
        public string Name { get; set; } = "Default name";
        [JsonIgnore]
        public virtual ICollection<Course> Courses { get; set; }

        public bool IsDeleted { get; set; } = false;

        public DateTime CreatedAt { get; set; } = new DateTime();

    }
}
