import express from "express";

import {getCategorys,
        getCategorysId,
        crearCategory,
        deleteCategory,
        updateCategory,
} from "../controllers/Category.js";

import { verifyUser, onlyAdmin } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/categorys', verifyUser, onlyAdmin, getCategorys);
router.get('/categorys/:id', verifyUser, onlyAdmin, getCategorysId);
router.post('/categorys', verifyUser, onlyAdmin, crearCategory);
router.patch('/categorys/:id', verifyUser, onlyAdmin, updateCategory);
router.delete('/categorys/:id', verifyUser, onlyAdmin, deleteCategory);

export default router;