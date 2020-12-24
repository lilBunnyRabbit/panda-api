import express, { Router } from 'express';
import { addUser, getUserById } from '../../database/dbUtils';
import { getUpdateMessage, sendError } from '../../utils/utils';
const router: Router = express.Router();

router.get("/get/:userId", async (req, res) => {
    if(!req.params.userId) return sendError(res, "Mising params");
    const user = await getUserById(req.params.userId);
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
        time_created: Date.now()
    });
    return res.json(getUpdateMessage(new_user));
});

export const userRouter: Router = router;