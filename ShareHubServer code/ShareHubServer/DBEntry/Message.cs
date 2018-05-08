using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShareHubServer.DBEntry {
    public class Message : EntryBase {
        public string Author;
        public DateTime TimeOfSending;
        public string Content;
        public string Ip;
        public string CommunityId;
    }
}
