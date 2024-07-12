import React, { useEffect, useState } from 'react';
import { FaGoogle, FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import Head from 'next/head';
import axios from 'axios';
import Router from 'next/router';
import Cookies from 'js-cookie';

const Login = () => {
    const [active, setActive] = useState(false);
    const [signUpData, setSignUpData] = useState({ username: '', email: '', password: '' });
    const [signInData, setSignInData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            Router.push('/');
        }
    }, []);

    const handleSignUpChange = (e) => {
        const { name, value } = e.target;
        setSignUpData({ ...signUpData, [name]: value });
    };

    const handleSignInChange = (e) => {
        const { name, value } = e.target;
        setSignInData({ ...signInData, [name]: value });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/signup', signUpData);
            handleSignIn(); 
        } catch (error) {
            console.error('Sign Up Error:', error);
            setError('Failed to sign up. Please try again.');
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/signin', signInData);
            const { token } = response.data;
            Cookies.set('token', token);
            Router.push('/');
        } catch (error) {
            console.error('Sign In Error:', error);
            setError('Invalid username or password. Please try again.');
        }
    };

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <div className='login-container'>
                <div className={`login-form ${active ? 'active' : ''}`} id="login-form">
                    <div className="form-container sign-up">
                        <form onSubmit={handleSignUp}>
                            <h1>Create Account</h1>
                            <div className="social-icons">
                                <a href="#" className="icon"><FaGoogle /></a>
                                <a href="#" className="icon"><FaFacebook /></a>
                                <a href="#" className="icon"><FaGithub /></a>
                                <a href="#" className="icon"><FaLinkedin /></a>
                            </div>
                            <span>or use your email for registration</span>
                            <input type="text" name="username" placeholder="Username" onChange={handleSignUpChange} />
                            <input type="email" name="email" placeholder="Email" onChange={handleSignUpChange} />
                            <input type="password" name="password" placeholder="Password" onChange={handleSignUpChange} />
                            <button type="submit">Sign Up</button>
                    
                        </form>
                    </div>
                    <div className="form-container sign-in">
                        <form onSubmit={handleSignIn}>
                            <h1>Sign In</h1>
                            <div className="social-icons">
                                <a href="#" className="icon"><FaGoogle /></a>
                                <a href="#" className="icon"><FaFacebook /></a>
                                <a href="#" className="icon"><FaGithub /></a>
                                <a href="#" className="icon"><FaLinkedin /></a>
                            </div>
                            {error && <p className="error-message">{error}</p>}
                            <span>username or email</span>
                            <input type="text" name="username" placeholder="Username" required onChange={handleSignInChange} className={error ? 'error' : ''} />
                            <input type="password" name="password" placeholder="Password" required onChange={handleSignInChange} />
                            <a href="#">Forget Your Password?</a>
                            <button type="submit">Sign In</button>
                        </form>
                    </div>
                    <div className="toggle-container">
                        <div className="toggle">
                            <div className="toggle-panel toggle-left">
                                <h1>Welcome Back!</h1>
                                <p>Enter your personal details to use all site features</p>
                                <button className="hidden" id="login" onClick={() => setActive(false)}>Sign In</button>
                            </div>
                            <div className="toggle-panel toggle-right">
                                <h1>Hello, Friend!</h1>
                                <p>Register with your personal details to use all site features</p>
                                <button className="hidden" id="register" onClick={() => setActive(true)}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
