# Config
## User
```ts
{
    _id: string,
    email: string,
    household: string,
    permissions: string[],
    time_created: number
}
```

| Key | Value
|:-|:-
| `_id` | Google ID |
| `email` | gmail | 
| `household` | ID of the household | 
| `permissions` | list of permission IDs | 
| `time_created` | EPOCH when the user was created | 

## Household
```ts
{
    _id: string
}
```

| Key | Value
|:-|:-
| `_id` | household ID |

## Permission
```ts
{
    _id: string
}
```

| Key | Value
|:-|:-
| `_id` | permission ID |

---

# MISC
## Grocery List
```ts
{
    _id: ObjectId,
    name: string,
    username: string,
    household: string,
    time_created: number,
    comment?: string
}
```

| Key | Value
|:-|:-
| `_id` | auto generated ID by mongoDB |
| `name` | name of the item | 
| `username` | username of the user who added the item | 
| `household` | ID of the household | 
| `time_created` | EPOCH when the user was created | 
| `comment` | optional item comment | 

## Wishlist
```ts
{
    _id: ObjectId,
    name: string,
    user_id: string,
    time_created: number
}
```

| Key | Value
|:-|:-
| `_id` | auto generated ID by mongoDB |
| `name` | name of the wish | 
| `user_id` | ID of the user | 
| `time_created` | EPOCH when the user was created | 

## Game Session
```ts
{
    _id: ObjectId,
    user_id: string,
    players: string[],
    time_created: number
}
```

| Key | Value
|:-|:-
| `_id` | auto generated ID by mongoDB |
| `name` | name of the item | 
| `username` | username of the user who added the item | 
| `household` | ID of the household | 
| `time_created` | EPOCH when the user was created | 
| `comment` | optional item comment | 