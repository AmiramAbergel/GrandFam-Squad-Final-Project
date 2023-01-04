import React, { useEffect, useState } from 'react';

import Modal from '../components/UI/Modal/Modal.js';
import AuthForm from '../components/Auth/AuthForm.js';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import MyImage from '../assets/LogoBG.png';
import { useCookies } from 'react-cookie';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Main = styled.main`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    background-image: linear-gradient(to right, #18d777, #39e991);

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url('http://localhost:4001/static/media/LogoBG.c63192f6c16ce7a6366a.png');
        background-size: cover;
        filter: blur(10px);
        z-index: -1;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80%;
    max-width: 50vw;
    text-align: center;
`;

const DanceButton = styled.button`
    font-size: 2rem;
    border: none;
    border-radius: 5px;
    padding: 1rem 2rem;
    cursor: pointer;
    transition: all 0.3s;
    background-color: #39e991;
    color: #ffffff;
    animation: ${spin} 0.5s ease-in-out;
    margin-top: 2rem;

    &:hover {
        background-color: #67eeaa;
    }
`;

const LoadingIndicator = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 2rem;
    color: #39e991;
`;

const Headline = styled.h1`
    font-size: 3rem;
    color: #3c3f50;
    margin-bottom: 2rem;
`;

const Description = styled.p`
    font-size: 1.5rem;
    color: #ffffff;
    margin-bottom: 2rem;
`;

const Image = styled.img`
    width: 100%;
    height: 200px;
    object-fit: contain;
    margin-bottom: 2rem;
    border-radius: 5px;
    background-size: cover;
`;

const FeatureList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 70%;
`;

const Feature = styled.li`
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    color: #ffffff;

    &:before {
        content: '';
        display: inline-block;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: #39e991;
        margin-right: 1rem;
    }
`;

const Home = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        removeCookie('token');
    }, []);
    return (
        <Main>
            <Container>
                <Headline>Welcome to GrandFam-Squad!</Headline>
                <Description>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vestibulum ac efficitur lectus. Morbi vel mauris velit.
                    Aliquam in tincidunt ex. Maecenas aliquam, quam non auctor
                    dapibus, massa enim ultricies nulla, vel consectetur diam
                    ipsum sit amet diam.
                </Description>
                <Image src={MyImage} alt='Dance studio' />
                <FeatureList>
                    <Feature>
                        <i className='fas fa-check'></i>
                        Professional
                    </Feature>
                    <Feature>
                        <i className='fas fa-check'></i>
                        Wide variety
                    </Feature>
                    <Feature>
                        <i className='fas fa-check'></i>
                        Convenient
                    </Feature>
                    <Feature>
                        <i className='fas fa-check'></i>
                        Fun and welcoming atmosphere
                    </Feature>
                </FeatureList>
            </Container>
            {isLoading ? (
                <LoadingIndicator>
                    <i className='fas fa-spinner fa-spin'></i>
                </LoadingIndicator>
            ) : (
                <DanceButton onClick={() => setIsLoading(true)}>
                    Login / Register
                </DanceButton>
            )}
            {isLoading && (
                <Modal onClose={() => setIsLoading(false)}>
                    <AuthForm />
                </Modal>
            )}
        </Main>
    );
};

export default Home;
