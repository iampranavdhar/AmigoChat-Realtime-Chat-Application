import React, { useState, useContext } from 'react'
import './Signin-up.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import { AuthContext } from '../Context/AuthContext'

function Signin() {

    const [email, setEmail] = useState()   /* Instead of Using useState hook we can use useRef and keep ref in the required input field for getting data */
    const [password, setPassword] = useState()
    const [error,setError] = useState("")
    const { isFetching, dispatch } = useContext(AuthContext)

    const API_URL = process.env.REACT_APP_API_URL

    const loginCall = async (userCredential, dispatch) => {
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post(API_URL+"api/auth/signin", userCredential);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        }
        catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err })
            setError("Wrong Password Or Username")
        }
    }

    const handleForm = (e) => {
        e.preventDefault()
        loginCall({ email, password }, dispatch)
    }

    return (
        <div className='signin-container'>
            <div className="signin-card">
                <form onSubmit={handleForm}>
                    <h2 className="signin-title"> Log in</h2>
                    <p className="line"></p>
                    <div className="error-message"><p>{error}</p></div>
                    <div className="signin-fields">
                        <label htmlFor="email"> <b>Email</b></label>
                        <input className='signin-textbox' type="email" placeholder="Enter Email" name="username" required onChange={(e) => { setEmail(e.target.value) }} />
                        <label htmlFor="password"><b>Password</b></label>
                        <input className='signin-textbox' type="password" minLength='6' placeholder="Enter Password" name="psw" required onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <button className="signin-button" disabled={isFetching}>{isFetching ? <CircularProgress color="#ffffff" /> : "Log In"}</button>
                    <a className="forget-pass" href="#home">Forgot password?</a>
                </form>
                <div className='signup-option'>
                    <p className="signup-question">Don't have an account? <Link to='/signup'>Sign Up</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Signin