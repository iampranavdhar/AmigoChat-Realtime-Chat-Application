import React from 'react'
import './Message.css'
import { format } from "timeago.js"

function Message({message,own}) {
    return (
        <div>
            <p className={own?'message-sent':'message-received'}>
                <span>{message.text}</span>
                <span className='message-time'>{format(message.createdAt)}</span>
            </p>
        </div>
    )
}

export default Message
