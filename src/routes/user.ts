import express, { Router } from 'express';
import { UsersDB } from '../database/dbUtils';
import { checkParams, getUpdateMessage, sendError } from '../utils/utils';

const router: Router = express.Router();

router.get("/get/:user_id", getById);
router.get("/all", getAll);
router.post("/add", add);
router.put("/update/:user_id", updateById);

export default router;

/* HANDLERS */

const validDataCheck: {[key: string]: Function} = {
    name: (value: any) => typeof value == "string",
    household: (value: any) => typeof value == "string",
    permissions: (value: any) => {
        if(!Array.isArray(value)) return false;
        for(const v of value) {
            if(typeof v != "string") return false;
        }
        return true;
    }
}

async function getById({ params }: any, res: any) {
    if(!checkParams(params, res, [ "user_id" ])) return;
    
    const user = await UsersDB.getById(params.user_id);
    if(!user) return sendError(res, "User doesn't exist");

    return res.json(user);
}

async function getAll({}, res: any) {
    const users = await UsersDB.getAll();
    return res.json(users || []);
}

async function add({ body }: any, res: any) {
    if(!checkParams(body, res, [ "id", "name", "email" ])) return;
    if(await UsersDB.getById(body.id)) return sendError(res, "User exist");

    const data = {
        _id: body.id,
        name: body.name,
        email: body.email,
        household: "",
        permissions: [],
        time_created: Date.now()
    }

    return res.json(getUpdateMessage(await UsersDB.add(data)));
}

async function updateById({ body, params }: any, res: any) {
    if(!checkParams(params, res, [ "user_id" ])) return;
    if(!await UsersDB.getById(params.user_id)) return sendError(res, "User doesnt exist");

    const data: any = {};

    for(const key in body) {
        if(key in validDataCheck && validDataCheck[key](body[key])) {
            data[key] = body[key];
        }
    }

    if(Object.keys(data).length == 0) return sendError(res, "Bad data");

    return res.json(getUpdateMessage(
        await UsersDB.updateById(params.user_id, data)
    ));
}