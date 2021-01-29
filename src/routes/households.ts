import express, { Router } from 'express';
import { HouseholdsDB, UsersDB } from '../database/dbUtils';
import { checkParams, getUpdateMessage, sendError } from '../utils/utils';

const router: Router = express.Router();

router.get("/all", getAll);
router.get("/allWithUserCount", getAllWithUserCount);
router.post("/add", add);
router.delete("/remove", remove);

export default router;

/* HANDLERS */

async function getAll({}, res: any) {
    const households = await HouseholdsDB.getAll<any>();
    return res.json(households || []);
}

async function getAllWithUserCount({}, res: any) {
    let households = await HouseholdsDB.getAll<any>() || [];
    households = await Promise.all(households.map(async (household: any) => {
        let count = 0;
        const users_count: any[] = await UsersDB.countByParams({ household: household._id }, "users") || [];

        if(users_count.length > 0) count = users_count[0].users;

        household.users = count;
        return household;
    }))
    return res.json(households );
}

async function add({ body }: any, res: any) {
    if(!checkParams(body, res, [ "name" ])) return;

    const exists: any[] = await HouseholdsDB.getByParams({ name: new RegExp(body.name, "i") }) || [];
    if(exists.length > 0) return sendError(res, "Household exists");

    const data = {
        _id: body.name.replace(/ /g, "_").toLowerCase(),
        name: body.name,
        time_created: Date.now()
    }

    return res.json(getUpdateMessage(await HouseholdsDB.add(data)));
}

async function remove({ body }: any, res: any) {
    if(!checkParams(body, res, [ "id" ])) return;

    if(!await HouseholdsDB.getById<any>(body.id)) return sendError(res, "That household doesn't exist");
    
    return res.json(getUpdateMessage(
        await HouseholdsDB.deleteById(body.id)
    ));
}