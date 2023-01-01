import { useState } from 'react';
import { useAuth } from '../../hooks/Auth.js';
import classes from './AuthForm.module.css';
import { useNavigate } from 'react-router-dom';
import UserSignForm from './UserSignForm.js';

const AuthForm = () => {
    const navigate = useNavigate();
    const { login, signUp } = useAuth();
    const [isSignUp, setIsSignUp] = useState(false); // new state variable
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        lastName: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const changeHandler = (e) => {
        setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (isSignUp) {
                // check if sign up or login
                await signUp(
                    form.email,
                    form.password,
                    form.confirmPassword,
                    form.name,
                    form.lastName
                );
            } else {
                await login(form.email, form.password);
            }
        } catch (err) {
            console.log('Invalid email or password');
            console.log(err);
        }
        setIsLoading(false);
    };

    return (
        <section className={classes.auth}>
            <main className='main'>
                <div className='login-form'>
                    <h2 className='heading-secondary ma-bt-lg'>
                        {isSignUp ? 'Sign Up' : 'Log In'}
                    </h2>
                    <form>
                        <div className='form__group'>
                            <label className='form__label' htmlFor='email'>
                                Email address
                            </label>
                            <input
                                onChange={changeHandler}
                                className='form__input'
                                id='email'
                                type='email'
                                placeholder='you@example.com'
                                required='required'
                            />
                        </div>
                        <div className='form__group ma-bt-md'>
                            <label className='form__label' htmlFor='password'>
                                Password
                            </label>
                            <input
                                onChange={changeHandler}
                                className='form__input'
                                id='password'
                                type='password'
                                placeholder='••••••••'
                                required='required'
                                minLength={8}
                            />
                            {isSignUp ? (
                                <UserSignForm onChange={changeHandler} />
                            ) : (
                                ''
                            )}
                        </div>
                        <div className='form__group'>
                            <button
                                onClick={submitHandler}
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
        </section>
    );
};

export default AuthForm;
