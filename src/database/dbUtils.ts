import { DatabaseHandler } from '../utils/DatabaseHandler';
import * as mongoDB from './mongoDB';

export const GroceryListDB = new DatabaseHandler(mongoDB.collections.GROCERY_LIST);
export const UsersDB = new DatabaseHandler(mongoDB.collections.USERS);
export const WishlistDB = new DatabaseHandler(mongoDB.collections.WHISHLIST);
export const PermissionsDB = new DatabaseHandler(mongoDB.collections.PERMISSIONS);
export const HouseholdsDB = new DatabaseHandler(mongoDB.collections.HOUSEHOLDS);