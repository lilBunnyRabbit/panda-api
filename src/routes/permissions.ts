import express, { Router } from 'express';
import { permissionsDB } from '../database/dbUtils';
import { checkParams, getUpdateMessage, sendError } from '../utils/utils';

const router: Router = express.Router();

router.get("/all", getAll);

export default router;

/* HANDLERS */

async function getAll({}, res: any) {
    const permissions = await permissionsDB.all();
    return res.json(permissions || []);
}