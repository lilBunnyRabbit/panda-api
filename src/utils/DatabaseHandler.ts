import * as mongoDB from '../database/mongoDB';

export class DatabaseHandler {
    private collection: string;
    constructor(collection: string) {
        this.collection = collection;
    }

    public async getById<T>(_id: any): Promise<T> {
        return mongoDB.getData(this.collection, { _id }, false);
    }
    
    public async getByParams<T>(params: any): Promise<T> {
        return mongoDB.getData(this.collection, params, true);
    }

    public async getAll<T>(): Promise<T> {
        return mongoDB.getData(this.collection, {}, true);
    }
    
    public async add(data: any) {
        return mongoDB.insertData(this.collection, data);
    }
    
    public async updateById(_id: any, data: any) {
        return mongoDB.updateData(this.collection, { _id }, data, false);
    }
    
    public async updateByParams(params: any, data: any) {
        return mongoDB.updateData(this.collection, params, data, true);
    }
    
    public async deleteById(_id: any) {
        return mongoDB.deleteData(this.collection, { _id }, false);
    }
    
    public async deleteByParams(params: any) {
        return mongoDB.deleteData(this.collection, params, true);
    }
    
    public async countByParams<T>(params: any, name: string): Promise<T> {
        return mongoDB.countData(this.collection, params, name);
    }
}