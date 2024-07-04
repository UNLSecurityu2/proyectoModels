import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/Users.js"

import { verifyUser, onlyAdmin } from "../middleware/AuthUser.js";

const router = express.Router();

//rutas

router.get('/users',verifyUser,  getUsers);
router.get('/users/:id',verifyUser, getUserById);
router.post('/users', createUser);
router.patch('/users/:id', verifyUser, onlyAdmin, updateUser);
router.delete('/users/:id', verifyUser, onlyAdmin, deleteUser);


export default router;