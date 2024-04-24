import React from "react"
import "./Form.css";
const Logout = ({updateUser}) => {

    return ( 
        <button className="loginSignupButton" onClick={() => {updateUser({});}} >Logout</button> 
    )
}

export default Logout