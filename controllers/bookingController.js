import Booking from "../models/booking.js";
import { isCustomerValid } from "./userControllers.js";

export function createBooking(req, res){

    if (!isCustomerValid(req)){
        res.status(403).json({
            message : "Forbidden"
        }) 
        return
    }

    const { roomId, email, start, end } = req.body;
        if (!roomId || !email || !start || !end) {
            return res.status(400).json({ message: "All fields are required" });
        }

    const startingId = 1200;

    Booking.countDocuments({}).then(
        (count)=>{
            console.log(count);
            const newId = startingId + count + 1;
            const newBooking = new Booking({
                bookingId : newId,
                roomId : req.body.roomId,
                email : req.body.email,
                start : req.body.start,
                end : req.body.end,
            })
            newBooking.save().then(
                (result )=>{
                    res.json({
                        message : "Booking created successfully",
                        result : result
                    })
                }
            ).catch(
                (error)=>{
                    res.json({
                        message : "Booking creation failed",
                        error : err
                    })
                }
            )
        }

    ).catch(
        (err)=>{
            res.json({
                message : "Booking creation failed",
                error : err
            })
        }
    )
}

export function deleteBooking(req, res) {
    
    if (!isCustomerValid(req)) {
        res.status(403).json({
            message: "Forbidden"
        });
        return;
    }

    const bookingId = req.params.bookingId;
    if (!bookingId) {
        return res.status(400).json({
            message: "Booking ID is required"
        });
    }

    Booking.findOne({ bookingId: bookingId })
        .then(booking => {
            if (!booking) {
                return res.status(404).json({
                    message: "Booking not found"
                });
            }

            
            if (booking.email !== req.body.email) {
                return res.status(403).json({
                    message: "You can only delete your own bookings"
                });
            }

            return Booking.deleteOne({ bookingId: bookingId });
        })
        .then(result => {
            if (result && result.deletedCount > 0) {
                res.json({
                    message: "Booking deleted successfully",
                    result: result
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "Failed to delete booking",
                error: err
            });
        });
}
