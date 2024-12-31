import Booking from "../models/booking.js";

export function createBooking(req, res){

    const startingId = 1200;

    Booking.countDocuments({}).then(
        (count)=>{
            console.log(count);
            const newId = "INV"+ startingId + count + 1;
        }
    )
}
