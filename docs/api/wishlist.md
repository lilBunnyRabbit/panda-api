## **Wishlist** `/wishlist`

| **POST** | `/add` |
| :- | :- |
| `name` | Name of the item |
| `user_id` | ID of the user who added the item | 
| **RESPONSE** | [Database](../objects.md#database-response) or [Error](../objects.md#error) |

| **DELETE** | `/remove` |
| :- | :- |
| `id` | Item ID |
| **RESPONSE** | [Database](../objects.md#database-response) or [Error](../objects.md#error) |

| **GET** | `/list/:user_id` |
| :- | :- |
| **RESPONSE** | [Wishlist Item](../objects.md#wishlist)[ ] or [Error](../objects.md#error) |