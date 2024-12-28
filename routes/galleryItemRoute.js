import express from "express";
import { createGalleryItem, getGalleryItems } from "../controllers/galleryItemController.js";
import { get } from "mongoose";

const galleryItemRouter = express.Router();

galleryItemRouter.post("/",createGalleryItem)
galleryItemRouter.get("/", getGalleryItems)

export default galleryItemRouter;