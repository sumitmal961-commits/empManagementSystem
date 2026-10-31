import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';


function LoginPage() {


    const [LoginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...LoginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        const { email, password } = LoginInfo;
        if (!email || !password) {
            return handleError('email and password are required!')
        }

        try {
            const url = "https://empbackendsystem.onrender.com/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(LoginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/employee')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message)
            }
        } catch (err) {
            handleError(err);
        }
    }


    return (
        <div className='container formarea'>
            <div className='auth-card'>
                <h2>LOGIN</h2>

                <form onSubmit={handleLogin}>
                    <input type='email' className='form-control mb-3' placeholder='Enter Email' required onChange={handleChange}name='email' value={LoginInfo.name} />
                    <input type='password' className='form-control mb-3' placeholder='Enter Password' required onChange={handleChange} 
                     name='password' value={LoginInfo.password} />
                    <button className='btn btn-success w-100'>Login</button>
                    <span className='mt-3'>Don't have an account?<Link to="/signup">Sign Up</Link></span>
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}

export default LoginPage
