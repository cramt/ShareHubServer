using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShareHubServer.DBEntry {
    [Serializable]
    public class EntryBase {
        public ObjectId _id;
    }
}
