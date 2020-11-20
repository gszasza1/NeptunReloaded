using NeprunReloaded.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace NeptunReloaded.BLL.Models.Received
{
    public class CreateSubject
    {
        public string Name { get; set; } = "Default name";

        public Subject mapToDBSubject() {

            return new Subject
            {
                Name = this.Name,
                IsDeleted = false,
                CreatedAt = DateTime.UtcNow
            };
        }
    }
}
