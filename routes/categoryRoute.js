import express from 'express';
import {createCategory, deleteCategory, getCategory, getCategoryByName,getCategoryByPrice} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/",createCategory)

categoryRouter.delete("/:name",deleteCategory)

categoryRouter.get("/searchByPrice", getCategoryByPrice)

categoryRouter.get("/:name",getCategoryByName)

categoryRouter.get("/",getCategory)

export default categoryRouter;

