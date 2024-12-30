import Room from '../models/roomModel.js';
import {isAdminValid} from './userControllers.js';

//create room

export function createRoom( req, res){

if(!isAdminValid(req)){
    res.status(403).json({
        message : "Forbidden"
    })
    return
}

const newRoom = newRoom(req.body)

newRoom.save().then(
    (result)=>{
        res.json({
            message : "Room created successfully"
        })
    }
).catch(
    (err)=>{
        res.json({
            message : "Room creation failed",
            error : err
            
        })
    }
)

}

//delete room

export function deleteRoom(req,res){
    if(!isAdminValid(req)){
        res.status(403).json({
            message : "Forbidden"
        })
        return
    }

    const roomId = req.params.id

    Room.findOneAndDelete({roomId:roomId}).then(
        ()=>{
            res.json({
                message : "Room deleted successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message : "Room deletion failed"
            })
        }
    )
}

// Find Room By Id

export function findRoomById(req,res){

    const roomId = req.params.id  

    Room.findOne({roomId:roomId}).then(
        (room)=>{

            if(result == null){
                res.status(404).json({
                    message : "Room not found"
                })
                return
            }else{
                res.json(
                    {
                        message : "Room found",
                        result : result
                    }
                )
            }
        }
    ).catch(
        (err)=>{
            res.json({
                message : "Room not found",
                error : err
            })
        }
    )
}

// Get All Rooms

export function getRooms(req,res){

    Room.find().then(
        (result)=>{
            res.json({
                rooms : result
            })
        }
    ).catch(
        ()=>{
            res.json({
                message : "Failed to get rooms"
                
            })
        }
    )
}

// Update Room

export function updateRoom(req,res){

    if(!isAdminValid(req)){
        res.status(403).json({
            message : "Forbidden"
        })
        return
    }

    const roomId = req.params.roomId

    Room.findOneAndUpdate({roomId:roomId},req.body).then(
        ()=>{
            res.json({
                message : "Room updated successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message : "Room update failed"
            })
        }
    )
}