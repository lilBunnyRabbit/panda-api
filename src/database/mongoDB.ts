import { MongoClient, Db } from 'mongodb';
import assert from 'assert';
import default_data from './default.json';

let client: MongoClient;
let db: Db;

export const collections = {
    TEST: "test",
    GROCERY_LIST: "grocery-list",
    USERS: "users",
    WHISHLIST: "wishlist",
    PERMISSIONS: "permissions",
    HOUSEHOLDS: "households"
}

export async function connectToDB() {
    if(!process.env.MONGODB_URL) throw new Error("Missing MONGODB_URL in the .env");
    if(!process.env.DB_NAME) throw new Error("Missing DB_NAME in the .env");

    client = new MongoClient(process.env.MONGODB_URL, { useUnifiedTopology: true });

    client.connect((err) => {
        assert.strictEqual(null, err);
        console.log("Successfully connected to the MongoDb database");
        return insertDefault();
    });

    db = client.db(process.env.DB_NAME);
}

function insertDefault() {
    for(const collection in default_data) {
        db.listCollections({ name: collection }).next((err, info) => {
            if(info) return;
            for(const data of (<any>default_data)[collection]) {
                insertData(collection, data).then(() => {
                    console.log(`Added to ${collection}: ${JSON.stringify(data, null, 2)}`);
                })
            }
        });
    }
}

export function insertData(collection_name: string, data: any[] | any): Promise<any> {
    return new Promise((resolve, reject) => {
        const collection = db.collection(collection_name);
        if(Array.isArray(data)) {
            collection.insertMany(data, function(err, result) {
                if(err) reject(err);
                resolve(result);
            });
        } else {
            collection.insertOne(data, function(err, result) {
                if(err) reject(err);
                resolve(result);
            });
        }
    }) 
}

export function getData(collection_name: string, filters: any | undefined, isMany: boolean | undefined): Promise<any[] | any> {
    return new Promise((resolve, reject) => {
        const collection = db.collection(collection_name);
        if(isMany) {
            collection.find(filters ? filters : {}).toArray(function(err, output_data) {
                if(err) reject(err);
                resolve(output_data);
            });
        } else {
            collection.findOne(filters ? filters : {}, function(err, output_data) {
                if(err) reject(err);
                resolve(output_data);
            });
        }
    })
}

export function updateData(collection_name: string, filters: any, data: any, isMany: boolean | undefined): Promise<any[] | any> {
    return new Promise((resolve, reject) => {
        const collection = db.collection(collection_name);
        if(isMany) {
            collection.updateMany(filters, { $set: data }, function(err, output_data) {
                if(err) reject(err);
                resolve(output_data);
            }); 
        } else {
            collection.updateOne(filters, { $set: data }, function(err, output_data) {
                if(err) reject(err);
                resolve(output_data);
            }); 
        }
    })
}

export function deleteData(collection_name: string, filters: any, isMany: boolean | undefined): Promise<any[] | any> {
    return new Promise((resolve, reject) => {
        const collection = db.collection(collection_name);
        if(isMany) {
            collection.deleteMany(filters, function(err, output_data) {
                if(err) reject(err);
                resolve(output_data);
            }); 
        } else {
            collection.deleteOne(filters, function(err, output_data) {
                if(err) reject(err);
                resolve(output_data);
            }); 
        }
    })
}

export function countData(collection_name: string, filters: any, output_name: string): Promise<any[] | any> {
    return new Promise((resolve, reject) => {
        db.collection(collection_name).aggregate([
            { $match: filters },
            { $count: output_name }
        ]).toArray(function(err, output_data) {
            if(err) reject(err);
            resolve(output_data);
        });
    })
}