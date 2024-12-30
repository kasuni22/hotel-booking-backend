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

