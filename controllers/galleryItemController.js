import GalleryItem from "../models/galleryItem.js"
import { isAdminValid } from "./userControllers.js"


export function createGalleryItem(req,res){

    if (!isAdminValid(req)) {
        res.status(403).json({
            message : "Forbidden"
        })
        return
    }
    
    const galleryItem = req.body.item

    const newGalleryItem = new GalleryItem(galleryItem)
    newGalleryItem.save().then(
        ()=>{
            res.json({
                message: "Gallery Item created successfully"
            })
        }
    ).catch(
        ()=>{
            res.status(500).json({
                message: "Gallery Item creation failed"
            })
        }
    )
}

export function getGalleryItems(req,res){

    GalleryItem.find().then(
        (list)=>{
            res.json({
                list : list
            })
        }
    )
}

