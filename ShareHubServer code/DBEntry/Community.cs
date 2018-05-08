using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShareHubServer.DBEntry {
    public class Community : EntryBase, IBoxCarrier {
        public string Name;
        public string UniqueName;
        public string[] Users;
        public string Owner;
        public string[] Admins = new string[0];
        public Box[] Boxes { get; set; } = new Box[0];
        public string Description = "";
    }
}
