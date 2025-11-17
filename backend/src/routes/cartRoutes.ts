import { Router } from "express";
import {
    getCart,
    addItemToCart,
    deleteItemFromCart,
} from "../controllers/cartController.js";

const router: Router = Router();

router.get("/", getCart);
router.post("/", addItemToCart);
router.delete("/:id", deleteItemFromCart);

export default router;