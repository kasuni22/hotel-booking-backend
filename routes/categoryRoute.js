import express from 'express';
import {createCategory, deleteCategory, getCategory, getCategoryById,getCategoryByPrice,updateCategory} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/", createCategory)

categoryRouter.get("/", getCategory)
categoryRouter.get("/:id", getCategoryById)

categoryRouter.put("/:id", updateCategory)
categoryRouter.delete("/:id", deleteCategory)

categoryRouter.get("/searchByPrice", getCategoryByPrice)



export default categoryRouter;

