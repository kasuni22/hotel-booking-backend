import express from 'express';  
import { createBooking, deleteBooking, updateBookingDetails, updateBookingNotes, updateBookingStatus } from '../controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);

bookingRouter.delete("/:bookingId", deleteBooking);

bookingRouter.patch("/:bookingId/status", updateBookingStatus);

bookingRouter.put("/:bookingId", updateBookingDetails);

bookingRouter.patch("/:bookingId/notes", updateBookingNotes);

export default bookingRouter;