using NeprunReloaded.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace NeptunReloaded.BLL.Models.Received
{
    public class CreateRoom
    {
        public string Name { get; set; } = "Default name";

        public Room mapToDBRoom() {

            return new Room
            {
                Name = this.Name,
                CreatedAt = DateTime.UtcNow
            };
        }
    }
}
