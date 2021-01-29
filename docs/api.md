# Panda API
- [Panda API](#panda-api)
  - [**User** `/user`](#user-user)
  - [**Permissions** `/permissions`](#permissions-permissions)
  - [**Grocery List** `/grocery-list`](#grocery-list-grocery-list)
  - [**Wishlist** `/wishlist`](#wishlist-wishlist)

---------------------------------------------------------------------------------------------------

## **User** `/user`

| **GET** | `/get/:user_id` |
| :- | :- |
| **RESPONSE** | [User](objects.md#user) or [Error](objects.md#Error) |

| **GET** | `/all` |
| :- | :- |
| **RESPONSE** | [User](objects.md#user)[] |

| **POST** | `/add` |
| :- | :- |
| `id` | Google ID |
| `email` | Gmail |
| **RESPONSE** | [Database](objects.md#database-response) or [Error](objects.md#error) |

| **PUT** | `/update/:user_id` |
| :- | :- |
| `name` | **[optional]** new name |
| `household` | **[optional]** new household |
| `permissions` | **[optional]** new array of permissions |
| **RESPONSE** | [Database](objects.md#database-response) or [Error](objects.md#error) |

---------------------------------------------------------------------------------------------------

## **Permissions** `/permissions`

| **GET** | `/all` |
| :- | :- |
| **RESPONSE** | [Permission](objects.md#permission)[ ] |

---------------------------------------------------------------------------------------------------

## **Grocery List** `/grocery-list`

| **GET** | `/all` - temporary |
| :- | :- |
| **RESPONSE** | [Grocery Item](objects.md#grocery-list)[ ] |

| **GET** | `/list/:household_id` |
| :- | :- |
| **RESPONSE** | [Grocery Item](objects.md#grocery-list)[ ] or [Error](objects.md#error) |

| **POST** | `/add` |
| :- | :- |
| `name` | Item name |
| `username` | Username of the user who added the item |
| `household` | Household ID |
| `comment` | **[optional]** comment for the item |
| **RESPONSE** | [Database](objects.md#database-response) |

| **POST** | `/auto-complete` |
| :- | :- |
| `input` | Name input |
| **RESPONSE** | [Grocery Item](objects.md#grocery-list)[ ] or [Error](objects.md#error) |

| **DELETE** | `/remove` |
| :- | :- |
| `id` | Item ID |
| **RESPONSE** | [Database](objects.md#database-response) or [Error](objects.md#error) |

---------------------------------------------------------------------------------------------------

## **Wishlist** `/wishlist`

| **POST** | `/add` |
| :- | :- |
| `name` | Name of the item |
| `user_id` | ID of the user who added the item | 
| **RESPONSE** | [Database](objects.md#database-response) or [Error](objects.md#error) |

| **DELETE** | `/remove` |
| :- | :- |
| `id` | Item ID |
| **RESPONSE** | [Database](objects.md#database-response) or [Error](objects.md#error) |

| **GET** | `/list/:user_id` |
| :- | :- |
| **RESPONSE** | [Wishlist Item](objects.md#wishlist)[ ] or [Error](objects.md#error) |