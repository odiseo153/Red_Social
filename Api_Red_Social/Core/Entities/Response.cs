using System;
using System.Net;

namespace Core.Entities
{
    public class Response
    {
        public object response { get; set; } = null;
        public bool HasFail { get; set; } = false;
        public object Error { get; set; } = null;
        public int Status { get; set; } = 200;


    }
}
