import GalleryItem from "../models/galleryItem.js"
import { isAdminValid } from "./userControllers.js"

export function createGalleryItem(req,res){
    if (!isAdminValid(req)) {
        return res.status(403).json({ message: "Forbidden" })
    }
    const { name, image, description } = req.body
    const newGalleryItem = new GalleryItem({ name, image, description })
    newGalleryItem.save()
        .then(() => res.json({ message: "Gallery Item created successfully" }))
        .catch(() => res.status(500).json({ message: "Gallery Item creation failed" }))
}

export function getGalleryItems(req,res){
    GalleryItem.find()
        .then((list) => res.json({ list }))
        .catch(() => res.status(500).json({ message: "Failed to get gallery items" }))
}

export function deleteGalleryItem(req,res){
    if (!isAdminValid(req)) {
        return res.status(403).json({ message: "Forbidden" })
    }
    const id = req.params.id
    GalleryItem.findByIdAndDelete(id)
        .then((result) => {
            if (!result) return res.status(404).json({ message: "Gallery Item not found" })
            res.json({ message: "Gallery Item deleted successfully" })
        })
        .catch(() => res.status(500).json({ message: "Gallery Item deletion failed" }))
}