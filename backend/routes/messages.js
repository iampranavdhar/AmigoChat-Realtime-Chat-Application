import express from 'express'
import Message from '../models/Message.js'

const router = express.Router()

/* Posting a Message based on the chatroom id and senderId */
router.post('/',async (req,res)=>{
    const newMessage = await new Message({
        chatroomId:req.body.chatroomId,
        senderId:req.body.senderId,
        text:req.body.text
    })
    try{
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

/* Get Messages based on the conversationId */
router.get('/:chatroomId',async(req,res)=>{
    try{
        const messages = await Message.find({
            chatroomId:req.params.chatroomId
        });
        res.status(200).json(messages)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

export default router
