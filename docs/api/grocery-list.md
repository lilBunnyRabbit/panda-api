## **Grocery List** `/grocery-list`

| **GET** | `/all` - temporary |
| :- | :- |
| **RESPONSE** | [Grocery Item](../objects.md#grocery-list)[ ] |

| **GET** | `/list/:household_id` |
| :- | :- |
| **RESPONSE** | [Grocery Item](../objects.md#grocery-list)[ ] or [Error](../objects.md#error) |

| **POST** | `/add` |
| :- | :- |
| `name` | Item name |
| `username` | Username of the user who added the item |
| `household` | Household ID |
| `comment` | **[optional]** comment for the item |
| **RESPONSE** | [Database](../objects.md#database-response) |

| **POST** | `/auto-complete` |
| :- | :- |
| `input` | Name input |
| **RESPONSE** | [Grocery Item](../objects.md#grocery-list)[ ] or [Error](../objects.md#error) |

| **DELETE** | `/remove` |
| :- | :- |
| `id` | Item ID |
| **RESPONSE** | [Database](../objects.md#database-response) or [Error](../objects.md#error) |