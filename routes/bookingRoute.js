import express from 'express';  
import { createBooking, deleteBooking, updateBookingDetails, updateBookingStatus } from '../controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);

bookingRouter.delete("/:bookingId", deleteBooking);

bookingRouter.patch("/:bookingId/status", updateBookingStatus);

bookingRouter.put("/:bookingId", updateBookingDetails);

export default bookingRouter;