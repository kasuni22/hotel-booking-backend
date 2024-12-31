import express from 'express';  
import { createBooking, deleteBooking } from '../controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);

bookingRouter.delete("/:bookingId", deleteBooking);

export default bookingRouter;