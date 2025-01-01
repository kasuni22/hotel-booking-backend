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

//update Booking Status

export function updateBookingStatus(req, res) {
    
    if (!isAdminValid(req)) {
        res.status(403).json({
            message: "Forbidden - Admin access required"
        });
        return;
    }

    const { bookingId } = req.params;
    const { status, reason } = req.body;

    
    if (!bookingId || !status) {
        return res.status(400).json({
            message: "Booking ID and status are required"
        });
    }

    
    const validStatuses = ["pending", "approved", "rejected", "cancelled", "completed"];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({
            message: "Invalid status value",
            validStatuses: validStatuses
        });
    }

    Booking.findOne({ bookingId: bookingId })
        .then(booking => {
            if (!booking) {
                return res.status(404).json({
                    message: "Booking not found"
                });
            }

            
            return Booking.findOneAndUpdate(
                { bookingId: bookingId },
                { 
                    status: status,
                    reason: reason || "",
                    timeStamp: Date.now() 
                },
                { new: true } 
            );
        })
        .then(updatedBooking => {
            res.json({
                message: "Booking status updated successfully",
                booking: updatedBooking
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Failed to update booking status",
                error: err
            });
        });
}

//update Booking Details

export function updateBookingDetails(req, res) {
   
    if (!isAdminValid(req)) {
        res.status(403).json({
            message: "Forbidden - Admin access required"
        });
        return;
    }

    const { bookingId } = req.params;
    const { roomId, email, start, end, notes } = req.body;

    if (!bookingId) {
        return res.status(400).json({
            message: "Booking ID is required"
        });
    }

    
    const updateData = {};
    if (roomId) updateData.roomId = roomId;
    if (email) updateData.email = email;
    if (start) updateData.start = start;
    if (end) updateData.end = end;
    if (notes !== undefined) updateData.notes = notes;
    updateData.timeStamp = Date.now();

    
    if (Object.keys(updateData).length === 1) { 
        return res.status(400).json({
            message: "No valid fields provided for update"
        });
    }

    Booking.findOne({ bookingId: bookingId })
        .then(booking => {
            if (!booking) {
                return res.status(404).json({
                    message: "Booking not found"
                });
            }

            
            if (email && !/.+@.+\..+/.test(email)) {
                return res.status(400).json({
                    message: "Invalid email format"
                });
            }

            
            if (start && end) {
                const startDate = new Date(start);
                const endDate = new Date(end);
                if (startDate >= endDate) {
                    return res.status(400).json({
                        message: "End date must be after start date"
                    });
                }
            }

            return Booking.findOneAndUpdate(
                { bookingId: bookingId },
                updateData,
                { new: true }
            );
        })
        .then(updatedBooking => {
            res.json({
                message: "Booking updated successfully",
                booking: updatedBooking
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Failed to update booking",
                error: err
            });
        });
}

//update Booking Notes

export function updateBookingNotes(req, res) {
    
    if (!isAdminValid(req)) {
        res.status(403).json({
            message: "Forbidden - Admin access required"
        });
        return;
    }

    const { bookingId } = req.params;
    const { notes } = req.body;

    if (!bookingId) {
        return res.status(400).json({
            message: "Booking ID is required"
        });
    }

    if (!notes && notes !== "") {
        return res.status(400).json({
            message: "Notes field is required"
        });
    }

    Booking.findOne({ bookingId: bookingId })
        .then(booking => {
            if (!booking) {
                return res.status(404).json({
                    message: "Booking not found"
                });
            }

            return Booking.findOneAndUpdate(
                { bookingId: bookingId },
                { 
                    notes: notes,
                    timeStamp: Date.now()
                },
                { new: true }
            );
        })
        .then(updatedBooking => {
            res.json({
                message: "Booking notes updated successfully",
                booking: updatedBooking
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Failed to update booking notes",
                error: err
            });
        });
}

//get Bookings

export function getBookings(req, res) {
    
    const isAdmin = isAdminValid(req);
    const isCustomer = isCustomerValid(req);

    
    if (!isAdmin && !isCustomer) {
        return res.status(403).json({
            message: "Forbidden - Authentication required"
        });
    }

    
    const { page = 1, limit = 10, status, startDate, endDate } = req.query;
    const skip = (page - 1) * limit;

    
    let query = {};

    
    if (!isAdmin) {
        const customerEmail = req.body.email || req.query.email;
        if (!customerEmail) {
            return res.status(400).json({
                message: "Email is required for customer bookings"
            });
        }
        query.email = customerEmail;
    }

    
    if (status) {
        query.status = status;
    }
    if (startDate || endDate) {
        query.start = {};
        if (startDate) query.start.$gte = new Date(startDate);
        if (endDate) query.start.$lte = new Date(endDate);
    }

    
    Booking.countDocuments(query)
        .then(totalCount => {
            
            return Booking.find(query)
                .sort({ timeStamp: -1 }) 
                .skip(skip)
                .limit(parseInt(limit))
                .then(bookings => {
                    res.json({
                        message: "Bookings retrieved successfully",
                        data: {
                            bookings: bookings,
                            currentPage: parseInt(page),
                            totalPages: Math.ceil(totalCount / limit),
                            totalBookings: totalCount,
                            limit: parseInt(limit)
                        }
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                message: "Failed to retrieve bookings",
                error: err
            });
        });
}
