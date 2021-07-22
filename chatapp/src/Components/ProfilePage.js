import React, { useContext, useState } from "react";
import "./ProfilePage.css";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

function ProfilePage({ toggler, togglestate }) {

  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState(user.username)
  const [photo, setPhoto] = useState("")

  const API_URL = process.env.REACT_APP_API_URL

  const handleSubmit = async (e) => {
    e.preventDefault()
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const updated_data = new FormData();
    updated_data.append("username", username);
    if (photo !== "") {
      updated_data.append("photo", photo);
    }

    try {
      await axios.put(API_URL + 'api/users/' + user?._id, updated_data, config)
      const result = await axios.get(API_URL+"api/users/"+user?._id)
      const data = JSON.stringify(result.data)
      localStorage.setItem("user",data)
    }
    catch (err) {
      console.log(err)
    }
    window.location.reload()
  }

  return (
    <div className="profile">
      <div className={togglestate ? "profile-card-open" : "profile-card-close"}>
        <div className="close-div">
          <span onClick={toggler}>
            <p className="close-symbol">x</p>
          </span>
        </div>
        <img className="profile-image" src={user?.photo ? API_URL+"photo/" + user?.photo : "assets/noavatar.jpg"} alt=""></img>
        <form>
          <label htmlFor="username">Username</label>
          <input type="text" className="username-input" value={username} onChange={(e) => { setUsername(e.target.value) }} required></input>
          <input
            className="update-profilepic"
            type="file"
            accept=".png, .jpg, .jpeg, .gif"
            name="photo"
            onChange={(e) => {
              setPhoto(e.target.files[0]);
            }}
          />
          <button onClick={handleSubmit}>UPDATE</button>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
