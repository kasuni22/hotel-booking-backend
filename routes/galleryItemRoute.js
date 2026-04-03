import express from "express";
import { createGalleryItem, getGalleryItems, deleteGalleryItem } from "../controllers/galleryItemController.js";


const galleryItemRouter = express.Router();

galleryItemRouter.post("/",createGalleryItem)
galleryItemRouter.get("/", getGalleryItems)
galleryItemRouter.delete("/:id", deleteGalleryItem)

export default galleryItemRouter;