import * as mongoDB from './mongoDB';

// Test
export async function getTestById<T>(_id: any): Promise<T> {
    return mongoDB.getData(mongoDB.collections.TEST, { _id }, false);
}

export async function getTestByParams<T>(params: any): Promise<T> {
    return mongoDB.getData(mongoDB.collections.TEST, params, false);
}

export async function addTest<T>(data: any): Promise<T> {
    return mongoDB.insertData(mongoDB.collections.TEST, data);
}

export async function updateTestById(_id: any, data: any) {
    return mongoDB.updateData(mongoDB.collections.TEST, { _id }, data, false);
}

export async function updateTestByParams(params: any, data: any) {
    return mongoDB.updateData(mongoDB.collections.TEST, params, data, true);
}

export async function deleteTestById(_id: any) {
    return mongoDB.deleteData(mongoDB.collections.TEST, { _id }, false);
}

export async function deleteTestByParams(params: any) {
    return mongoDB.deleteData(mongoDB.collections.TEST, params, true);
}

// GROCERY_LIST
export async function addGroceryItem<T>(data: any): Promise<T> {
    return mongoDB.insertData(mongoDB.collections.GROCERY_LIST, data);
}

export async function getGroceryItemById<T>(_id: any): Promise<T> {
    return mongoDB.getData(mongoDB.collections.GROCERY_LIST, { _id }, false);
}

export async function updateGroceryItemById<T>(_id: any, data: any): Promise<T> {
    return mongoDB.updateData(mongoDB.collections.GROCERY_LIST, { _id }, data, false);
}

export async function getGroceryItemsByParams<T>(params: any): Promise<T> {
    return mongoDB.getData(mongoDB.collections.GROCERY_LIST, params, true);
}

export async function getAllGroceryItems<T>(): Promise<T> {
    return mongoDB.getData(mongoDB.collections.GROCERY_LIST, {}, true);
}

export async function deleteGroceryItemById<T>(_id: any): Promise<T> {
    return mongoDB.deleteData(mongoDB.collections.GROCERY_LIST, { _id }, false);
}

// USERS
export async function addUser<T>(data: any): Promise<T> {
    return mongoDB.insertData(mongoDB.collections.USERS, data);
}

export async function getUserById<T>(_id: any): Promise<T> {
    return mongoDB.getData(mongoDB.collections.USERS, { _id }, false);
}

export async function updateUser<T>(_id: any, data: any): Promise<T> {
    return mongoDB.updateData(mongoDB.collections.USERS, { _id }, data, false);
}

export async function getUserByParams<T>(params: any): Promise<T> {
    return mongoDB.getData(mongoDB.collections.USERS, params, true);
}

export async function getUsers<T>(): Promise<T> {
    return mongoDB.getData(mongoDB.collections.USERS, {}, true);
}

export async function deleteUserById<T>(_id: any): Promise<T> {
    return mongoDB.deleteData(mongoDB.collections.USERS, { _id }, false);
}