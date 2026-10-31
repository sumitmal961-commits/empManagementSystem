import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';


function SignupPage() {
 
    const [SignupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);
        const copySignupInfo = { ...SignupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const handleSignup = async (e) => {
        e.preventDefault();

        const { name, email, password } = SignupInfo;
        if (!name || !email || !password) {
            return handleError('name, email and password are required!')
        }

        try {
            const url = "https://empbackendsystem.onrender.com/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(SignupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
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
                <h2>SIGN UP</h2>

                <form onSubmit={handleSignup}>
                    <input type='text' className='form-control mb-3' placeholder='Enter Name' required onChange={handleChange}  name='name' value={SignupInfo.name} />
                    <input type='email' className='form-control mb-3' placeholder='Enter Email' required onChange={handleChange} name='email' value={SignupInfo.email} />
                    <input type='password' className='form-control mb-3' placeholder='Enter Password' required onChange={handleChange} name='password' value={SignupInfo.password} />
                    <button type='submit'  className='btn btn-success w-100'>Sign Up</button>
                    <span className='mt-3'>Already have an account?<Link to="/login">Login</Link></span>
                </form>
                <ToastContainer />
            </div>
        </div>

    )
}

export default SignupPage
