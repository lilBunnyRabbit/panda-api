/*
{
    _id: ObjectId,
    name: string,
    user_id: string,
    time_created: number
}
*/
import express, { Router } from 'express';
import { getUpdateMessage, sendError } from '../utils/utils';
import { ObjectId } from 'mongodb';
import { wishlistDB } from '../database/dbUtils';

const router: Router = express.Router();

router.post("/add", async (req, res) => {
    if(!req?.body?.name) return sendError(res, "Missing name");
    if(!req?.body?.user_id) return sendError(res, "Missing user_id");

    const update_data: any = {
        name: req.body.name,
        user_id: req.body.user_id,
        time_created: Date.now()
    };

    const new_wishlist_item: any = await wishlistDB.add<any>(update_data);
    return res.json(getUpdateMessage(new_wishlist_item));
});

router.delete("/remove", async (req, res) => {
    if(!req.body?.id) return sendError(res, "Missing id");
    if(!ObjectId.isValid(req.body.id)) return sendError(res, "Bad id");
    const _id = new ObjectId(req.body.id);
    const wishlist_item = await wishlistDB.getById<any>(_id);
    if(!wishlist_item) return sendError(res, "That wishlist item doesn't exist");
    const deleted_wishlist_item = await wishlistDB.deleteById<any>(wishlist_item._id);
    return res.json(getUpdateMessage(deleted_wishlist_item));
});

router.get("/list/:user_id", async (req, res) => {
    if(!req?.params.user_id) return sendError(res, "Missing user_id");
    const wishlist_items = await wishlistDB.getByParams({ user_id: req.params.user_id });
    return res.json(wishlist_items || []);
});

export default router;