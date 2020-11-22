using System;
using System.Collections.Generic;
using System.Text;

namespace NeptunReloaded.BLL.Models.Received
{
    public class ChangeUserRole
    {
        public int userId { get; set; }
        public string newRole { get; set; }
    }
}
