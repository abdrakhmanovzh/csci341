import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useNavigate();
 
    const Auth = async (e) => {
        e.preventDefault();
      
        try {
            await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            });
            history("/admin");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }
 
    return (
            <div className="View WelcomeView">
                <h1 className="Banner"> 
                    <a href = "/">LoremIpsum</a>
                </h1>
                <div className="Register">
                    <h2 className="RegisterText">Sign In</h2>
                        <form onSubmit={Auth}>
                            <p className="has-text-centered">{msg}</p>
                            <label className="label">Email</label>
                            <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label className="label">Password</label>
                            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />    
                            <button className="RegisterButton">Enter the system</button>
                        </form>
                    </div>
                </div>
    )
}
 
export default Login