import React from 'react'
import { useEffect, useState } from 'react'
import Swal from "sweetalert2"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
const baseUrl = "https://nyx.yoiego.my.id"
const localhost = 'http://localhost:3000'
export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const navigate = useNavigate()

    const data = (e) => {
        e.preventDefault()
        const userData = {
            name: name,
            email: email,
            password: password,
            phoneNumber: phoneNumber
        }

        axios.post(localhost + "/register", userData).then((response) => {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            })
            console.log(response.status, response.data)
            Toast.fire({
                icon: "success",
                title: "Success create user"
            })
            navigate("/login")
        }).catch((error) => {
            console.log(error.response, "<<<< ini response error")
            Swal.fire({
                title: "Failed!",
                html: error.response.data.message,
                icon: "error",
                confirmButtonText: "Ok"
            })
        })
    }

    return (
        <>
            <div style={{ backgroundImage: "url(https://w0.peakpx.com/wallpaper/10/336/HD-wallpaper-assassin-creed-black-bnw-white.jpg)", height: "100vh" }} >
                <div className="text-center" style={{ paddingTop: "3em", color: "#EACDC2" }}><h1>Welcome to Talk to Stranger</h1></div>
                <div className="d-flex align-items-center justify-content-center">
                    <form onSubmit={data} method='post'>
                        <div className="mb-3">
                            <label style={{ color: "#EACDC2" }} htmlFor="exampleFormControlInput1" className="form-label">Name</label>
                            <input value={name} onChange={e => { setName(e.target.value) }} type="text" className="form-control" placeholder="Insert your name" />
                        </div>
                        <div className="mb-3">
                            <label style={{ color: "#EACDC2" }} htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                            <input value={email} onChange={e => { setEmail(e.target.value) }} type="email" className="form-control" placeholder="name@example.com" />
                        </div>
                        <div className="mb-3">
                            <label style={{ color: "#EACDC2" }} htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                            <input value={password} onChange={e => { setPassword(e.target.value) }} style={{ width: "30em" }} type="password" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label style={{ color: "#EACDC2" }} htmlFor="exampleFormControlInput1" className="form-label">Phone Number</label>
                            <input value={phoneNumber} onChange={e => { setPhoneNumber(e.target.value) }} type="text" className="form-control" placeholder="08xxxxxxxxxx" />
                        </div>
                        <button type='submit' className="btn btn-primary w-screen" style={{ width: "30em" }}>Register</button>
                    </form>
                </div>
                <div style={{ marginLeft: "28em", marginTop: "5px" }}>
                    <p style={{ color: "#EACDC2" }}>Have account already?</p>
                    <Link to='/login'>  <button className="btn btn-outline-primary" >Sign In</button></Link>
                </div>
            </div>
        </>
    )
}
