# ShareBox Server api
1. Introduction
2. Result Base
3. User Gateway
    1. Check
    2. Check key
    3. Profile data
    4. New
    5. Register nfc
    6. Delete nfc
4. Community Gateway
    1. New
    2. Get my communities
    3. Get community
    4. Send message
    5. REST for new message
    6. Invite
6. Box Gateway
    1. Check nfc
    2. Move box
    3. Rename box
    4. Initialize new box

## Introduction
all request for the api will be POST

if the arguments are null the response status code will be 405 `(not accepted)`
## Result Base
```typescript
{
    type: string;
    authorized: boolean;
    message: string;
    success: boolean;
}
```
All api responses will have this json as the base.

`type` will usally be "unauthorized", "unsuccessful" or "successful"

`authorized` determines if the user key is authorized

`message` will be "all good" if the request was successful, otherwise it will contain the reason that the request was not successful

`success` determines if the request was a success

the rest of the documentation will implicit include this

## User Gateway
"api/UserGateway/"
### Check
"api/UserGateway/Check"

This checks a username and a password and returns a key
#### request
the request is an http post request with 2 parameters
```typescript
{
    username: string;
    password: string;
}
```
#### response
the response will return json based on Result Base
```typescript
{
    cookieKey: string;
}
```
`cookieKey` will be the users key until it expires
### Check key
"api/UserGateway/CheckKey"

this checks your key given above
#### request
the request is an http post request with 1 parameter
```typescript
{
    key: string;
}
```
#### response
the response will return json based on Result Base
```typescript
{
    username: string | null;
}
```
`username` will be null if the key is not authorized
### Profile Data
this returns data of a user based on a key

"api/UserGateway/ProfileData"
#### request
the request is an http post request with 2 parameters
```typescript
{
    username: string;
    key: string;
}
```
`username` is the user you want data from

`key` is your key (obviously)
#### response
the response will return json based on Result Base
```typescript
{
    username: string | null;
    communitiesName: string[] | null;
    communitiesUniqueName: string[] | null;
    myself: boolean | null;
    nfcId: string | null;
    boxes: string[] | null;
    boxesKey: string[] | null;
}
```
all of theese will be null if the key is not authorized

if the user does not match the key, `myself` will be false, and `communitiesName` and `communitiesUniqueName` will be the common communities between key and the user, and `nfcId`, `boxes` and `boxesKey` will be null

### New
new creates a new user

"api/UserGateway/New"
#### request
the request is an http post request with 2 parameters
```typescript
{
    username: string;
    password: string;
}
```
#### response
the response will return json based on Result Base
```typescript
{
    cookieKey: string;
}
```
this is the exact same as Check
### Register nfc
registers a nfc for a user

"api/UserGateway/RegisterNfc"
#### request
the request is an http post request with 2 parameters
```typescript
{
    key: string;
    nfcId: string;
}
```
#### response
the response will return json with the same format as Return Base
### Delete nfc
deletes the nfc for a user

"api/UserGateway/DeleteNfc"
#### request
the request is an http post request with 1 parameter
```typescript
{
    key: string;
}
```
#### response
the response will return json with the same format as Return Base
## Community Gateway
"api/CommunityGateway/"
### New
creates a new community

"api/CommunityGateway/New"
#### request
```typescript
{
    userKey: string;
    communityId: string;
    communityName: string;
}
```
`userKey` is your key

`communityId` is the unique name for the community

`communityName` is the (nick)name for the community
#### response
the response will return json with the same format as Return Base

if the communityId is already taken, message will be "community id already exists"
### Get my communities
fetches all your (the keys) communities

"api/CommunityGateway/GetMy"
#### request
```typescript
{
    userKey: string;
}
```
#### response
the response will return json based on Result Base
```typescript
{
    communities: {
        name: string;
        uniqueName: string;
        users: string[];
        owner: string;
        admins: string[];
        description: string;
    }[] | null;
}
```
if the request is not a success, `communities` will be null
### Get community
fetched data from a specific community

"api/CommunityGateway/GetCommunity"
#### request
```typescript
{
    userKey: string;
    uniqueName: string;
}
```
`userKey` is your key

`uniqueName` is the communities unique name (id)
#### response
the response will return json based on Result Base
```typescript
{
    community: {
        name: string;
        uniqueName: string;
        users: string[];
        owner: string;
        admins: string[];
        description: string;
        boxKey: string[];
        boxLocation: string[];
        boxName: string[];
    } | null;
}
```
if the request is not a success, `community` will be null

### Send message
Send message to the community chat

"api/CommunityGateway/SendMessage"
#### request
```typescript
{
    userKey: string;
    message: string;
    communityId: string;
}
```
#### response
the response will return json with the same format as Return Base
### Get message
Get messages from the community chat

"api/CommunityGateway/GetMessage"
#### request
```typescript
{
    userKey: string;
    communityId: string;
    skip: number;
    limit: number;
}
```
the messages returned will be from skip to limit
#### response
the response will return json based on Result Base
```typescript
{
    messages: {
        author: string;
        timeOfSendering: number;
        content: string;
        objectId: string;
    }[] | null;
}
```
objectId is the id for the message
#### example
```typescript
{
    userKey: "[insert key]";
    communityId: "mycommunity";
    skip: 0;
    limit: 10;
}
```
this will return the first 10 messages from the chat
### REST for new message
Get messages from the community chat

"api/CommunityGateway/RESTMessage"
#### request
```typescript
{
    userKey: string;
    communityId: string;
}
```
#### response
the response will return json based on Result Base
```typescript
{
    restMessage: {
        author: string;
        timeOfSendering: number;
        content: string;
        objectId: string;
    } | null;
}
```
`objectId` is the id for the message
#### best practices
- this request will always wait for a new message to apear before responding
- due to the volatile nature of this request, always check the objectId, to see if you already have the message
### Invite
invites user to community

"api/CommunityGateway/invite"
#### request
```typescript
{
    userKey: string;
    communityId: string;
    userToInvite: string;
}
```
`userToInvite` is the users username
#### response
the response will return json with the same format as Return Base
## Box Gateway
"api/BoxGateway/"
### Check Nfc
checks wether or not a user can open a box based on their nfc id

"api/BoxGateway/CheckNfc"
#### request
```typescript
{
    nfcId: string;
    boxKey: string;
}
```
#### response
the response will return json with the same format as Return Base

the user can open the box if `success` is true
### Move Box
moves a box from either a user to a community or from a community to a user

"api/BoxGateway/MoveBox"
#### request
```typescript
{
    userKey: string;
    boxKey: string;
    to: string;
    toType: string;
}
```
`toType` can be either "community" or "user"
if `toType` is "user", `to` will be the username
if `tpType` is "community", `to` will be the community id
#### response
the response will return json with the same format as Return Base
### Rename Box
renames a box

"api/BoxGateway/RenameBox"
#### request
```typescript
{
    userKey: string;
    boxKey: string;
    newName: string;
}
```
#### response
the response will return json with the same format as Return Base
### Initialize new box
initializes a new box for a user

"api/BoxGateway/NewBox"
#### request
```typescript
{
    nfcId: string;
    location: string;
}
```
`nfcId` is the nfc id of the user that registered the box
`location` is the location of the box, can be empty
#### response
the response will return json based on Result Base
```typescript
{
   key: string;
   owner: string; 
}
```
`key` is the box's key
`owner` is the username of user that registered the box
