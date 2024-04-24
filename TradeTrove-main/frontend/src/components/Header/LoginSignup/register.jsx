import React, { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import "./Form.css";

const Register = () => {

    const history = useHistory()

    const url = "http://localhost:9002"

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const { name, email, password, reEnterPassword } = user
        if (name && email && password && (password === reEnterPassword)) {
            axios.post("http://localhost:5000/register", user)
                .then(res => {
                    alert(res.data.message)

                })

        } else {
            alert("invalid input")
        }

    }

    return (
        <div className="formSignup">
            <label htmlFor="chk" aria-hidden="true">Sign up</label>
            <div className="relative rounded-md shadow-sm space-y-2 flex flex-col items-center">
                <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={handleChange} className="block w-64 px-3 py-2 text-gray-700 placeholder-gray-400 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={handleChange} className="block w-64 px-3 py-2 text-gray-700 placeholder-gray-400 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={handleChange} className="block w-64 px-3 py-2 text-gray-700 placeholder-gray-400 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={handleChange} className="block w-64 px-3 py-2 text-gray-700 placeholder-gray-400 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
            </div>
            <button className="loginSignupButton" onClick={register} >Register</button>

        </div>

    )
}

export default Register