import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode"; 
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const Dashboard = () => {
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    

    useEffect(() => {
        refreshToken(); 
    });

    
    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                history.push("/");
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const GetEmail = async () => {
        const response = await axios.get('http://localhost:5000/dasboard/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setEmail(response.data);
    }

    const Logout = async () => {
        try{
            await axios.delete('http://localhost:5000/logout');
            history("/");
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <div className="View WelcomeView">
            <h1 className="Dashboard"> HELLO {email} </h1>

            <button onClick={Logout}>Logout</button>
        </div>
    )
}

export default Dashboard;