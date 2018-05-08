using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShareHubServer.Controllers.Api {
    public class Utilities {
        public static bool Sanitized(params object[] args) {
            for (int i = 0; i < args.Length; i++) {
                switch (args[i]) {
                    default:
                        if(args == null) {
                            return false;
                        }
                        break;
                }
            }
            return true;
        }
    }
}
