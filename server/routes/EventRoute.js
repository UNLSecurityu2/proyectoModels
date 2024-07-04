import express from "express";
import {
    getEvents,
    getEventsById,
    createEvents,
    updateEvents,
    deleteEvents
} from "../controllers/Events.js"

import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

//rutas

router.get('/events', verifyUser, getEvents);
router.get('/events/:id', verifyUser, getEventsById);
router.post('/events', verifyUser, createEvents);
router.patch('/events/:id', verifyUser, updateEvents);
router.delete('/events/:id', verifyUser, deleteEvents);


export default router;