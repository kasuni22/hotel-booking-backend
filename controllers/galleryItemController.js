import GalleryItem from "../models/galleryItem.js";
import { isAdminValid } from "./userControllers.js";


export function createGalleryItem(req,res){

    if(!isAdminValid(req)){
        return res.status(403).json({
            message : "Forbidden"
        })
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
        (error)=>{
            res.status(500).json({
                message: "Gallery Item creation failed",
                error: error.message
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

export function deleteGalleryItem(req,res){

    if(!isAdminValid(req)){
        return res.status(403).json({
            message : "Forbidden"
        })
    }

    const id = req.params.id;

    GalleryItem.findByIdAndDelete(id).then(
        (result)=>{
            if(!result) {
                return res.status(404).json({
                    message: "Gallery Item not found"
                });
            }
            res.json({
                message: "Gallery Item deleted successfully"
            })
        }
    ).catch(
        (error)=>{
            res.status(500).json({
                message: "Gallery Item deletion failed",
                error: error.message
            })
        }
    )
}
