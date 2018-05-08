# ShareBox Server Datebase
1. Introduction
2. Entry Base
3. Box
4. User
5. Community
6. Message

## Introduction
This is the classes used by mongodb to store data for our application

## Entry Base
```csharp
[Serializable]
public class EntryBase {
    public ObjectId _id;
}
```
All mongodb entries will inherit this class
## Box
```csharp
public class Box : EntryBase {
    public string Key;
    public string Location;
    public string Name;
}
```
## User
```csharp
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
```
## Community
```csharp
public class Community : EntryBase, IBoxCarrier {
    public string Name;
    public string UniqueName;
    public string[] Users;
    public string Owner;
    public string[] Admins = new string[0];
    public Box[] Boxes { get; set; } = new Box[0];
    public string Description = "";
}
```
## Message
```csharp
public class Message : EntryBase {
    public string Author;
    public DateTime TimeOfSending;
    public string Content;
    public string Ip;
    public string CommunityId;
}
```