import express from 'express';
import { createRoom, deleteRoom, findRoomById, getRooms, updateRoom } from '../controllers/roomControllers.js';

const roomRouter = express.Router();

roomRouter.post("/", createRoom)
roomRouter.delete("/:roomId", deleteRoom)
roomRouter.get("/", getRooms)
roomRouter.get("/:roomId", findRoomById)
roomRouter.put("/:roomId", updateRoom)

export default roomRouter
