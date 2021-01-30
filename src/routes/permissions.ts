import express, { Router } from 'express';
import { ObjectId } from 'mongodb';
import { PermissionsDB } from '../database/dbUtils';
import { checkParams, getUpdateMessage, sendError } from '../utils/utils';

const router: Router = express.Router();

router.get("/all", getAll);
router.post("/add", add);
router.delete("/remove", remove);

export default router;

/* HANDLERS */

async function getAll({}, res: any) {
    const permissions = await PermissionsDB.getAll();
    return res.json(permissions || []);
}

async function add({ body }: any, res: any) {
    if(!checkParams(body, res, [ "name" ])) return;

    const _id = body.name.replace(/ /g, "_").toLowerCase();
    if(await PermissionsDB.getById(_id)) return sendError(res, "Permission exists");

    const data = {
        _id,
        name: body.name,
        time_created: Date.now()
    }

    return res.json(getUpdateMessage(await PermissionsDB.add(data)));
}

async function remove({ body }: any, res: any) {
    if(!checkParams(body, res, [ "id" ])) return;

    if(!await PermissionsDB.getById<any>(body.id)) return sendError(res, "That permission doesn't exist");
    
    return res.json(getUpdateMessage(
        await PermissionsDB.deleteById(body.id)
    ));
}