import { Link, useNavigate } from "react-router-dom";
import { React, useState } from 'react';

export default function SignUp(props) {
    const [name, setName] = useState("");
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

    const userValid = (users) => {
        for(let i=0; i<users.length; i++){
            if(users[i].email === email){
                return false;
            }
        }
        return true;
    }

    const userSignup = async (e) => {
        e.preventDefault();
        let passHash = await generateHash(pass);
        let user = {
            name: name,
            email: email,
            pass: passHash
        }

        let users;
        if (localStorage.getItem("users") === null) {
            users = [];
        }
        else {
            users = JSON.parse(localStorage.getItem("users"));
        }

        if (userValid(users)) {
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
            props.showAlert("Account created successfully.","success");
            navigate("/login", { replace: true });
        }
        else{
            props.showAlert("Email id already registered. Can't register again.","danger");
        }
    }

    return (
        <div className='container my-3' style={props.myStyle}>
            <h2 className='text-center my-2'>SIGN UP</h2>
            <form className='my-2' onSubmit={userSignup}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Username</label>
                    <input type="text" required onChange={(e) => { setName(e.target.value.trim()) }} className="form-control" id="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" value={email} required onChange={(e) => { setEmail(e.target.value.trim()) }} className="form-control" id="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="pass" className="form-label">Password</label>
                    <input type="password" value={pass} required minLength={8} onChange={(e) => { setPass(e.target.value.trim()) }} className="form-control" id="pass" />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
            <div>Already have an account? <Link to="/login">Login Here</Link></div>
        </div>
    )
}
