import express, { Router } from 'express';
import { ObjectId } from 'mongodb';
import { 
    addGroceryItem, 
    getGroceryItemById, 
    getAllGroceryItems, 
    getGroceryItemsByParams, 
    deleteGroceryItemById,
} from '../database/dbUtils';
import { sendError, getUpdateMessage } from '../utils/utils';

const router: Router = express.Router();

router.post("/add", async (req, res) => {
    if(!req?.body?.name) return sendError(res, "Missing name");
    if(!req?.body?.username) return sendError(res, "Missing username");
    if(!req?.body?.household) return sendError(res, "Missing household");

    const update_data: any = {
        name: req.body.name,
        username: req.body.username,
        household: req.body.household,
        time_created: Date.now()
    };

    if(req?.body?.comment) update_data.comment = req.body.comment;

    const new_grocery_item: any = await addGroceryItem<any>(update_data);
    return res.json(getUpdateMessage(new_grocery_item));
});

router.get("/all", async (req, res) => {
    const grocery_items = await getAllGroceryItems();
    return res.json(grocery_items || []);
});

router.get("/list/:household", async (req, res) => {
    if(!req?.params.household) return sendError(res, "Missing household");
    const grocery_items = await getGroceryItemsByParams({ household: req.params.household });
    return res.json(grocery_items || []);
});

router.post("/auto-complete", async (req, res) => {
    if(!req.body.input) return sendError(res, "Missing input");
    const grocery_items = await getGroceryItemsByParams({
        name: new RegExp(req.body.input, "i")
    });
    return res.json(grocery_items);
});

router.delete("/remove", async (req, res) => {
    if(!req.body?.id) return sendError(res, "Missing id");
    if(!ObjectId.isValid(req.body.id)) return sendError(res, "Bad id");
    const _id = new ObjectId(req.body.id);
    const grocery_item = await getGroceryItemById<any>(_id);
    if(!grocery_item) return sendError(res, "That grocery item doesn't exist");
    const deleted_grocery_item = await deleteGroceryItemById<any>(grocery_item._id);
    return res.json(getUpdateMessage(deleted_grocery_item));
});

export default router;