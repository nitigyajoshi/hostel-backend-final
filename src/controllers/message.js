import { asyncHandler } from '../utils/asyncHandler.js';
import Message from '../models/message.js';


const message = asyncHandler(async (req, res) => {
const {sender_id,receiver_id,message,sender_Name}=req.body
 // const hosteldetail=
   
  try {
    console.log('...................................................................')
    const message = await Message.findOne({
        sender_id: sender_id,
        receiver_id: receiver_id });

    if (!message) {
      return res.status(404).json({ message: 'Hostel detail not found' });
    }

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }


})
//add message
const addMessage = asyncHandler(async (req, res) => {
    const {sender_id,receiver_id,message,sender_Name}=req.body
     // const hosteldetail=
       
      try {
        console.log('...................................................................')
        const message = await Message.insert({
            
                sender_id: sender_id,
                receiver_id: receiver_id ,
                msg:message,
                sender_Name:sender_Name
        });
    
        if (!message) {
          return res.status(404).json({ message: 'Hostel detail not found' });
        }
    
        res.status(200).json(message);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    
    
    })

    export {message,addMessage}