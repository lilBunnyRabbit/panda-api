import express, { Router } from 'express';
import { checkParams, getUpdateMessage, sendError } from '../utils/utils';
import { ObjectId } from 'mongodb';
import { WishlistDB } from '../database/dbUtils';

const router: Router = express.Router();

router.get("/list/:user_id", listByUser);
router.post("/add", add);
router.delete("/remove", remove);

export default router;

/* HANDLERS */

async function listByUser({ params }: any, res: any) {
    if(!checkParams(params, res, [ "user_id" ])) return;

    const wishlist_items = await WishlistDB.getByParams<any[]>({ user_id: params.user_id });
    return res.json(wishlist_items || []);
}

async function add({ body }: any, res: any) {
    if(!checkParams(body, res, [ "name", "user_id" ])) return;

    const data: any = {
        name: body.name,
        user_id: body.user_id,
        time_created: Date.now()
    };

    return res.json(getUpdateMessage(
        await WishlistDB.add(data)
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