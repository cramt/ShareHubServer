using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Linq;

namespace ShareHubServer {
    public class Program {
        public static void Main(string[] args) => BuildWebHost(args).GetAwaiter().GetResult().Run();

        #region singletons
        public static Random Random = new Random();
        public static MongoClient DbClient;
        public static IMongoDatabase Database;
        #endregion

        public static async Task<IWebHost> BuildWebHost(string[] args) {

            Console.WriteLine("args are: " + String.Join(',', args));

            #region set mongo
            {
                bool j = true;
                Console.WriteLine("connecting to mongodb");
                while (j) {
                    DbClient = new MongoClient("mongodb://" + SECRET.MONGO.USERNAME + ":" + SECRET.MONGO.PASSWORD + "@" + SECRET.MONGO.SERVER_IP + ":" + SECRET.MONGO.PORT);
                    Database = DbClient.GetDatabase("ShareHub");
                    Task task = Database.RunCommandAsync((Command<BsonDocument>)"{ping:1}");
                    if (await Task.WhenAny(Task.Delay(10000), task) == task) {
                        Console.WriteLine("connected");
                        Console.WriteLine("continuing program");
                        j = false;
                    }
                    else {
                        Console.WriteLine("not connected");
                        Console.WriteLine("retrying");
                    }
                }
            }
            #endregion

            return WebHost.CreateDefaultBuilder(args)
                .UseStartup<ServerService>()
                .UseUrls("http://*:80")
                .Build();
        }
    }
}
