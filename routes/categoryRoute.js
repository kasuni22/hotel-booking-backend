import express from 'express';
import {createCategory, deleteCategory} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/",createCategory)

categoryRouter.delete("/:name",deleteCategory)

export default categoryRouter;

