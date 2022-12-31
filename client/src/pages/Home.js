import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Home.module.css';
import Modal from '../components/UI/Modal/Modal.js';
import { useAuth } from '../hooks/Auth.js';

const REDIRECT_PAGE = '/flavors';

const Home = () => {
    const { login, signUp } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [isSignUp, setIsSignUp] = useState(false); // new state variable
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (isSignUp) {
                // check if sign up or login
                await signUp(form.email, form.password);
            } else {
                await login(form.email, form.password);
            }
            navigate(REDIRECT_PAGE);
        } catch (err) {
            console.log('Invalid email or password');
            console.log(err);
        }
        setIsLoading(false);
    };

    return (
        <main>
            <div>
                <button
                    className={classes.dance}
                    onClick={() => setIsLoading(true)}
                >
                    Login / Register
                </button>
            </div>
            {isLoading && (
                <Modal onClose={() => setIsLoading(false)}>
                    <main className='main'>
                        <div className='login-form'>
                            <h2 className='heading-secondary ma-bt-lg'>
                                {isSignUp ? 'Sign Up' : 'Log In'}
                            </h2>
                            <form className='form form--login'>
                                <div className='form__group'>
                                    <label
                                        className='form__label'
                                        htmlFor='email'
                                    >
                                        Email address
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        className='form__input'
                                        id='email'
                                        type='email'
                                        placeholder='you@example.com'
                                        required='required'
                                    />
                                </div>
                                <div className='form__group ma-bt-md'>
                                    <label
                                        className='form__label'
                                        htmlFor='password'
                                    >
                                        Password
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        className='form__input'
                                        id='password'
                                        type='password'
                                        placeholder='*******'
                                        required='required'
                                        minLength={8}
                                    />
                                </div>
                                <div className='form__group'>
                                    <button
                                        onClick={handleSubmit}
                                        className='btn btn--green'
                                    >
                                        {isSignUp ? 'Sign Up' : 'Log In'}
                                    </button>
                                </div>
                            </form>
                            <p className='form__text'>
                                {isSignUp
                                    ? 'Already have an account?'
                                    : "Don't have an account?"}
                                <button
                                    className='form__text-btn'
                                    onClick={() => setIsSignUp(!isSignUp)}
                                >
                                    {isSignUp ? 'Log In' : 'Sign Up'}
                                </button>
                            </p>
                        </div>
                    </main>
                </Modal>
            )}
        </main>
    );
};

export default Home;
