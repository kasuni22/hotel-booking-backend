import express from 'express';  
import { createBooking, deleteBooking, updateBookingStatus } from '../controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);

bookingRouter.delete("/:bookingId", deleteBooking);

bookingRouter.patch("/:bookingId/status", updateBookingStatus);

export default bookingRouter;