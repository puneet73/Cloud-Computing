import React, { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import "./Form.css";
const Login = ({ updateUser }) => {

    const url = "http://localhost:9002"

    const history = useHistory()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        axios.post("http://localhost:5000/login", user)
            .then(res => {
                alert(res.data.message)
                updateUser(res.data.user)
                history.push("/")
            })
    }

    return (
        <div className="formLogin">
            <label htmlFor="chk" aria-hidden="true">Login</label>
            <div className="relative rounded-md shadow-sm space-y-2 flex flex-col items-center">
                <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Email" className="block w-64 px-3 py-2 text-gray-700 placeholder-gray-400 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" className="block w-64 px-3 py-2 text-gray-700 placeholder-gray-400 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
            </div>
            <button className="loginSignupButton" onClick={login}>Login</button>
        </div>
    )
}

export default Login