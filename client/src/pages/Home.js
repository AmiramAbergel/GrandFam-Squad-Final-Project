import React, { useState } from 'react';

import classes from './Home.module.css';
import Modal from '../components/UI/Modal/Modal.js';
import AuthForm from '../components/Auth/AuthForm.js';

const Home = () => {
    const [isLoading, setIsLoading] = useState(false);

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
                    <AuthForm />
                </Modal>
            )}
        </main>
    );
};

export default Home;
