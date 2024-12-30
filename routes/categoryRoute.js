import express from 'express';
import {createCategory, deleteCategory, getCategory, getCategoryByName} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/",createCategory)

categoryRouter.delete("/:name",deleteCategory)

categoryRouter.get("/searchByPrice",(req,res)=>{
    res.json({
        message : "searchByPrice"
    })
})

categoryRouter.get("/:name",getCategoryByName)

categoryRouter.get("/",getCategory)

export default categoryRouter;

