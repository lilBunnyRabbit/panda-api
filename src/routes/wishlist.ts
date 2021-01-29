import express, { Router } from 'express';
import { checkParams, getUpdateMessage, sendError } from '../utils/utils';
import { ObjectId } from 'mongodb';
import { WishlistDB } from '../database/dbUtils';

const router: Router = express.Router();

router.get("/list/:user_id", listByUser);
router.post("/add", add);
router.delete("/remove", remove);
router.put("/update/:wish_id", updateById);

export default router;

/* HANDLERS */

const validDataCheck: {[key: string]: Function} = {
    name: (value: any) => typeof value == "string",
    stars: (value: any) => !Number.isNaN(value),
}

async function listByUser({ params }: any, res: any) {
    if(!checkParams(params, res, [ "user_id" ])) return;

    const wishlist_items = await WishlistDB.getByParams<any[]>({ user_id: params.user_id });
    return res.json(wishlist_items || []);
}

async function add({ body }: any, res: any) {
    if(!checkParams(body, res, [ "name", "user_id", "stars" ])) return;
    if(Number.isNaN(body.stars)) return sendError(res, "Bad request");

    const data: any = {
        name: body.name,
        stars: body.stars,
        user_id: body.user_id,
        time_created: Date.now()
    };

    return res.json(getUpdateMessage(
        await WishlistDB.add(data)
    ));
}

async function updateById({ body, params }: any, res: any) {
    if(!checkParams(params, res, [ "wish_id" ])) return;

    if(!ObjectId.isValid(params.wish_id)) return sendError(res, "Bad id");

    const _id = new ObjectId(params.wish_id);
    console.log({ _id });
    
    if(!await WishlistDB.getById(_id)) return sendError(res, "Wish doesnt exist");

    const data: any = {};

    for(const key in body) {
        if(key in validDataCheck && validDataCheck[key](body[key])) {
            data[key] = body[key];
        }
    }

    if(Object.keys(data).length == 0) return sendError(res, "Bad data");

    return res.json(getUpdateMessage(
        await WishlistDB.updateById(_id, data)
    ));
}

async function remove({ body }: any, res: any) {
    if(!checkParams(body, res, [ "id" ])) return;
    if(!ObjectId.isValid(body.id)) return sendError(res, "Bad id");

    const _id = new ObjectId(body.id);
    if(!await WishlistDB.getById<any>(_id)) return sendError(res, "That wishlist item doesn't exist");

    return res.json(getUpdateMessage(
        await WishlistDB.deleteById(_id)
    ));
}