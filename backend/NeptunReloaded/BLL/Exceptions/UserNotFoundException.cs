using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace NeptunReloaded.BLL.Exceptions
{
    public class UserNotFoundException : BaseException
    {

        public UserNotFoundException(HttpStatusCode status, string msg) : base(status, msg)
        {
            this.Status = HttpStatusCode.NotFound;
            this.Message = "A felhasználó nem, található";
        }
    }
}
