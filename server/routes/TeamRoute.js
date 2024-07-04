import express from "express";

import {getTeamsById,
        getTeams,
        crearTeam,
        deleteTeam,
        updateTeam,
} from "../controllers/Teams.js";

import { verifyUser, onlyAdmin } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/teams', verifyUser, onlyAdmin, getTeams);
router.get('/teams/:id', verifyUser, onlyAdmin, getTeamsById);
router.post('/teams', verifyUser, onlyAdmin, crearTeam);
router.patch('/teams/:id', verifyUser, onlyAdmin, updateTeam);
router.delete('/teams/:id', verifyUser, onlyAdmin, deleteTeam);

export default router;