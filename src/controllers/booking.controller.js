//import {HostelOwner} from '../models/hostelOwner.model';
//import {Hostel} from '../models/hostel.model';
//import {Booking} from '../models/booking.model';
import Booking from '../models/booking.model.js'
import { asyncHandler } from '../utils/asyncHandler.js';
//import { CustomError } from '../utils/ApiError.js'
import { generateAccessAndRefreshToken,generateOTP,generateVerificationToken } from '../utils/MinorMethods.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import {sendEmail} from '../utils/mail.js'
import {generateEmailTemplate} from '../utils/mailTemplate.js'
import jwt from 'jsonwebtoken'
import CustomError from '../utils/ApiError.js';
import Hostel from '../models/recent_hostel_model.js'
import User from '../models/user.model.js'


const bookingController = asyncHandler(async(req,res)=>{
    try {
        const { username, _id,  } = req.body;
     console.log(req.body)
     const hostel = await Hostel.findById(_id);
     const hostel_id=_id;

     const addedBy=hostel.addedBy;
     console.log(hostel.addedBy)
     const newBooking = new Booking({
        hostel_id,
        username,
        
        addedBy,
       
    });
    await newBooking.save();
    res.status(200).json(newBooking)
    } catch (error) {
        throw new CustomError(500, `Internal server error ${error}`);

    }

})
const getStatus = asyncHandler(async(req,res)=>{
    try {
const hostel_id=req.body.hostel_id
      //  const {  hostel_id,username } = req.body;
     console.log(req.body)
     
        const hostel = await Booking.find({hostel_id:hostel_id,});
        //const hostel_id=_id;
   
        const addedBy=hostel.addedBy;
       console.log(hostel)
   res.status(200).json(hostel)
     
    
    } catch (error) {
        throw new CustomError(500, `Internal server error ${error}`);

    }
//res.send("send")
})
//send notification
const checkNotification = asyncHandler(async(req,res)=>{
    try {
        const {  username,  } = req.body;
     console.log(req.body)
     const bookings = await Booking.find({addedBy:username});
     //const hostel_id=_id;
     const pendingBookings = bookings.filter(booking => booking.status === "pending");

     if (pendingBookings.length > 0) {
         // Do something with pending bookings, e.g., return them in the response
         console.log(pendingBookings.map(booking => booking.addedBy));
         return res.status(200).json(pendingBookings);
     } else {
         // No pending bookings found
         return res.status(200).json({ message: "No pending bookings found" });
     }
 
    } catch (error) {
        throw new CustomError(500, `Internal server error ${error}`);

    }
//res.send("send")
})

export {
    bookingController,getStatus,checkNotification

}
//export default bookingController;