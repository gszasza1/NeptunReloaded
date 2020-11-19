using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace NeptunReloaded.BLL.Exceptions
{
   public class BaseException :Exception
{
    public HttpStatusCode Status { get;  set; }

    public BaseException(HttpStatusCode status, string msg) : base(msg)
    {
        Status = status;
    }
}
}
