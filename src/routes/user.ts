import express, { Router } from 'express';
import { addUser, getUserById } from '../database/dbUtils';
import { getUpdateMessage, sendError } from '../utils/utils';

const router: Router = express.Router();

router.get("/get/:user_id", async (req, res) => {
    if(!req.params.user_id) return sendError(res, "Mising params");
    const user = await getUserById(req.params.user_id);
    if(!user) return sendError(res, "User doesn't exist");
    return res.json(user);
});

router.post("/add", async (req, res) => {
    if(!req?.body?.id) return sendError(res, "Missing id");
    if(!req?.body?.email) return sendError(res, "Missing email");

    if(await getUserById(req.body.id)) return sendError(res, "User exist");


    const new_user: any = await addUser<any>({
        _id: req.body.id,
        email: req.body.email,
        household: "",
        permissions: [],
        time_created: Date.now()
    });
    return res.json(getUpdateMessage(new_user));
});

export default router;