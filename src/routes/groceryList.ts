import express, { Router } from 'express';
import { ObjectId } from 'mongodb';
import { GroceryListDB } from '../database/dbUtils';
import { sendError, getUpdateMessage, checkParams } from '../utils/utils';

const router: Router = express.Router();

router.get("/all", getAll);
router.get("/list/:household_id", listByHousehold);
router.post("/add", add);
router.post("/auto-complete", autoComplete);
router.delete("/remove", remove);

export default router;

/* HANDLERS */

async function getAll({}, res: any) {
    const grocery_items = await GroceryListDB.getAll<any>();
    return res.json(grocery_items || []);
}

async function listByHousehold({ params }: any, res: any) {
    if(!checkParams(params, res, [ "household_id" ])) return;

    const grocery_items = await GroceryListDB.getByParams<any>({ household: params.household_id });
    return res.json(grocery_items || []);
}

async function add({ body }: any, res: any) {
    if(!checkParams(body, res, [ "name", "username", "household" ])) return;

    const data: any = {
        name: body.name,
        username: body.username,
        household: body.household,
        time_created: Date.now()
    };

    if(body?.comment) data.comment = body.comment;

    return res.json(getUpdateMessage(
        await GroceryListDB.add(data)
    ));
}

async function autoComplete({ body }: any, res: any) {
    if(!checkParams(body, res, [ "input" ])) return;

    const grocery_items = await GroceryListDB.getByParams({
        name: new RegExp(body.input, "i")
    }) || [];
    return res.json(grocery_items || []);
}

async function remove({ body }: any, res: any) {
    if(!checkParams(body, res, [ "id" ])) return;
    if(!ObjectId.isValid(body.id)) return sendError(res, "Bad id");

    const _id = new ObjectId(body.id);
    if(!await GroceryListDB.getById<any>(_id)) return sendError(res, "That grocery item doesn't exist");
    
    return res.json(getUpdateMessage(
        await GroceryListDB.deleteById(_id)
    ));
}