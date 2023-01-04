import { useState } from 'react';
import { useAuth } from '../../hooks/Auth.js';
import UserSignForm from './UserSignForm.js';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

import MyImage from '../../assets/LogoBG.png';
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const AuthFormWrapper = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80vh;
    background-color: #262833;
    border-radius: 500px;
    border-style: solid;
`;

const Main = styled.main`
    width: 80%;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: ${fadeIn} 0.5s ease-in-out;
    height: 85%;
`;

const Heading = styled.h2`
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #39e991;
    font-family: 'Roboto', sans-serif;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    height: ${(props) => (props.isSignUp ? '350px' : '260px')};
    width: 85%;
    overflow: auto;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    width: 100%;
    &:last-of-type {
        margin-bottom: 0;
    }
`;

const FormLabel = styled.label`
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: #3c3f50;
    font-family: 'Open Sans', sans-serif;
`;

const FormInput = styled.input`
    font-size: 1.2rem;
    border: 1px solid #ccc;
    border-radius: 100px;
    padding: 0.5rem;
    width: 80%;
    max-width: 500px;
    padding: 0.5rem 1rem;

    &:focus {
        outline: none;
        border-color: #39e991;
    }

    &::placeholder {
        color: #67eeaa;
    }
`;

const FormText = styled.p`
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #3c3f50;
    font-family: 'Open Sans', sans-serif;
`;

const FormTextButton = styled.button`
    font-size: 1.2rem;
    color: #18d777;
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-family: 'Open Sans', sans-serif;
    &:hover {
        text-decoration: underline;
    }
`;

const Button = styled.button`
    font-size: 1.2rem;
    border: none;
    border-radius: 5px;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.3s;
    width: 50%;
    font-family: 'Open Sans', sans-serif;

    &.btn-green {
        background-color: #39e991;
        color: #ffffff;
        font-family: 'Open Sans', sans-serif;

        &:hover {
            background-color: #67eeaa;
        }
    }
`;

const Image = styled.img`
    width: 100%;
    height: 220px;
    object-fit: cover;
    margin-bottom: 2rem;
    border-radius: 5px;
`;

const AuthForm = () => {
    const { login, signUp } = useAuth();
    const [isSignUp, setIsSignUp] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
        name: '',
        lastName: '',
        familyMember: {
            age: '',
            address: '',
            phone: '',
        },
    });
    const [isLoading, setIsLoading] = useState(false);

    const changeHandler = (e) => {
        const familyMemberProperties = ['age', 'address', 'phone'];
        console.log(e.target.id);
        setForm((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
            familyMember: {
                ...prev.familyMember,
                ...(familyMemberProperties.includes(e.target.id) && {
                    [e.target.id]: e.target.value,
                }),
            },
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (isSignUp) {
                await signUp(
                    form.email,
                    form.password,
                    form.passwordConfirm,
                    form.name,
                    form.lastName,
                    form.familyMember
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
        <AuthFormWrapper>
            <Main className='main'>
                <Image src={MyImage} alt='Auth form' />

                <Heading className='heading-secondary ma-bt-lg'>
                    {isSignUp ? 'Sign Up' : 'Log In'}
                </Heading>
                <Form>
                    <FormGroup>
                        <FormLabel className='form__label' htmlFor='email'>
                            Email address
                        </FormLabel>
                        <FormInput
                            onChange={changeHandler}
                            className='form__input'
                            id='email'
                            type='email'
                            placeholder='you@example.com'
                            required='required'
                        />
                    </FormGroup>
                    <FormGroup className='ma-bt-md'>
                        <FormLabel className='form__label' htmlFor='password'>
                            Password
                        </FormLabel>
                        <FormInput
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
                    </FormGroup>
                    <FormGroup>
                        <Button
                            onClick={submitHandler}
                            className='btn btn--green'
                        >
                            {isSignUp ? 'Sign Up' : 'Log In'}
                        </Button>
                    </FormGroup>
                </Form>
                <FormText>
                    {isSignUp
                        ? 'Already have an account?'
                        : "Don't have an account?"}
                    <FormTextButton
                        className='form__text-btn'
                        onClick={() => setIsSignUp(!isSignUp)}
                    >
                        {isSignUp ? 'Log In' : 'Sign Up'}
                    </FormTextButton>
                </FormText>
            </Main>
        </AuthFormWrapper>
    );
};

export default AuthForm;
