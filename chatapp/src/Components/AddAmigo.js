import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';
import './AddAmigo.css'

function AddAmigo({addchattoggler,addchattoggle}) {

    const [amigousername, setAmigoUsername] = useState()
    const { user } = useContext(AuthContext)

    const API_URL = process.env.REACT_APP_API_URL

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.get(`${API_URL}api/users/?username=${amigousername}`)
            setAmigoUsername("")
            const data = {
                senderId: user._id,
                receiverId: response.data._id
            }
            await axios.post(API_URL+'api/chatrooms', data)
        }
        catch (err) {
        }
        window.location.reload();
    }

    return (
        <div className='add-amigo-background'>
            <div className={addchattoggle?"add-amigo-open":"add-amigo-close"}>
                <div className="close-div" ><span onClick={addchattoggler}><p className="close-symbol">x</p></span></div>
                <form>
                    <img className='add-amigo-img' src='assets/addamigo.png' alt=''></img>
                    <input type="text" placeholder="Enter Username of Amigo" value={amigousername} onChange={(e) => { setAmigoUsername(e.target.value) }} required />
                    <button onClick={handleSubmit}>ADD AMIGO</button>
                </form>
            </div>
        </div>
    )
}

export default AddAmigo
