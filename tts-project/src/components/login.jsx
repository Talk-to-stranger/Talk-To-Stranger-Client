import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Swal from "sweetalert2"
import axios from "axios"
const baseUrl = "https://nyx.yoiego.my.id"
const localhost = 'http://localhost:3000'
export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(localhost + "/login", { email, password })
            localStorage.setItem("access_token", data.access_token)
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
            Toast.fire({
                icon: "success",
                title: "Success sign in"
            })
            setTimeout(() => {
                navigate('/')
            }, 2000)
        } catch (error) {
            Swal.fire({
                title: "Failed!",
                html: error.response.data.message,
                icon: "error",
                confirmButtonText: "Ok"
            })
        }
    }
    return (
        <>
            <div style={{ backgroundImage: "url(https://w0.peakpx.com/wallpaper/10/336/HD-wallpaper-assassin-creed-black-bnw-white.jpg)", height: "100vh" }} >
                <div className="text-center" style={{ paddingTop: "8em", color: "#EACDC2" }}><h1>Welcome to Talk to Stranger</h1></div>
                <div className="d-flex align-items-center justify-content-center">
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label style={{ color: "#EACDC2" }} htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                            <input value={email} onChange={e => { setEmail(e.target.value) }} type="email" className="form-control" placeholder="name@example.com" />
                        </div>
                        <div className="mb-3">
                            <label style={{ color: "#EACDC2" }} htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                            <input value={password} onChange={e => { setPassword(e.target.value) }} style={{ width: "30em" }} type="password" className="form-control" />
                        </div>
                        <button className="btn btn-primary w-screen" style={{ width: "30em" }}>Sign In</button>
                    </form>
                </div>
                <div style={{marginLeft: "28em", marginTop: "5px"}}>
                    <p style={{ color: "#EACDC2" }}>Don't have account?</p>
                  <Link to='/register'>  <button className="btn btn-outline-primary w-screen" >Sign Up</button></Link>
                </div>
            </div>
        </>
    )


}