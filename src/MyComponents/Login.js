import {Link, useNavigate} from "react-router-dom";
import {React, useState } from 'react';

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    let navigate = useNavigate();

    const generateHash = async (message) => {
        const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
        const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
        return hashHex;
    }

    const userLogin = async(e) => {
        e.preventDefault();
        let passHash = await generateHash(pass);
        
        if(localStorage.getItem("users") !== null){
            let users = JSON.parse(localStorage.getItem("users"));
            for(let i=0; i<users.length; i++){
                if(users[i].email === email){
                    if(users[i].pass === passHash){
                        props.showAlert("Login successful.","success");
                        props.setAuth(true);
                        return navigate("/home" , { replace: true });
                    }
                    else{
                        return props.showAlert("Wrong password. Please try again.","danger");
                    }
                }
            }
        }
        props.showAlert("Email id not registered. Please sign up.","danger");
    }

    return (
        <div className='container my-3'  style={props.myStyle}>
            <h2 className='text-center my-2'>LOGIN</h2>
            <form className='my-2' onSubmit={userLogin}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" value={email} required onChange={(e)=>{setEmail(e.target.value.trim())}} className="form-control" id="email" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="pass" className="form-label">Password</label>
                    <input type="password" minLength={8} required value={pass} onChange={(e)=>{setPass(e.target.value.trim())}} className="form-control" id="pass"/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <div>Don't have an account? <Link to="/signup">Sign Up Here</Link></div>
        </div>
    )
}
