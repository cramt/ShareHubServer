using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShareHubServer.Controllers.Api {
    internal abstract class ResultBase {
        public string type;
        public bool authorized;
        public string message;
        public bool success;
    }
    internal class Result : ResultBase { };
}
