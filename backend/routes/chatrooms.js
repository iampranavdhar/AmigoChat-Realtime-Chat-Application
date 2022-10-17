import express from 'express'
import Chatroom from '../models/Chatroom.js'

const router = express.Router()

/* Creating a Chatroom by members userId's */
router.post('/',async (req,res)=>{
    const newChatroom = new Chatroom({
        members : [req.body.senderId, req.body.receiverId],
    });
    try{
        const savedChatroom = await newChatroom.save();
        res.status(200).json(savedChatroom);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

/* Getting Chatrooms of a Particular user based on UserId*/
router.get('/:userId',async (req,res)=>{
    try{
        const chatrooms = await Chatroom.find({
            members:{$in:[req.params.userId]},
        })
        res.status(200).json(chatrooms)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

export default router
