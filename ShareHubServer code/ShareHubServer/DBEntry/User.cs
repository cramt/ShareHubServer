using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShareHubServer.DBEntry {
    public class Invite {
        public DateTime CreationTime;
        public string Author;
        public string Community;
    }
    public class User : EntryBase, IBoxCarrier {
        public string Username;
        public string Password;
        public string Cookie;
        public string NFCid;
        public DateTime CookieAvailability;
        public Invite[] Invites = new Invite[0];
        public Box[] Boxes { get; set; } = new Box[0];
    }
}
