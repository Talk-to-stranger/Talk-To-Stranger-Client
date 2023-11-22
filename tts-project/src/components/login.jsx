import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
const baseUrl = "http://localhost:3000"
export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(email, "<< ini email")
        console.log(password, "<< ini password")
        try {
            // const { data } = await axios.post(baseUrl + "/login", {email, password})
            // console.log(data)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    } 
    return (
        <>
        <div  style={{backgroundImage: "url(https://w0.peakpx.com/wallpaper/10/336/HD-wallpaper-assassin-creed-black-bnw-white.jpg)", height: "100vh"}} >
        <div className="text-center" style={{paddingTop: "8em", color: "#EACDC2"}}><h1>Welcome to Talk to Stranger</h1></div>
        <div className="d-flex align-items-center justify-content-center">
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label style={{color: "#EACDC2"}} htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                    <input value={email} onChange={e => {setEmail(e.target.value)}} type="email" className="form-control" placeholder="name@example.com" />
                </div>
                <div className="mb-3">
                    <label  style={{color: "#EACDC2"}} htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                    <input value={password} onChange={e => {setPassword(e.target.value)}} style={{width: "30em"}} type="password" className="form-control" />
                </div>
                <button className="btn btn-primary w-screen" style={{width: "30em"}}>Sign In</button>
            </form>
        </div>
        </div>
        </>
    )


}