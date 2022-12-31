import { createContext, useContext, useEffect, useState } from 'react';
import { clientAPI } from '../api/api.js';
import { useNavigate } from 'react-router-dom';

const authUrl = '/users';

const AuthUserContext = createContext({
    isLoading: true,
    loggedUser: null,
    token: null,
    error: null,
    signUp: () => {},
    login: () => {},
    logout: () => {},
});

export const useAuth = () => useContext(AuthUserContext);

export function AuthUserProvider({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const [loggedUser, setLoggedUser] = useState(null);
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            (async () => {
                try {
                    const { data } = await clientAPI(authUrl, {
                        method: 'GET',
                        token,
                    });
                    setLoggedUser(data);
                } catch (err) {
                    setError(err);
                } finally {
                    setIsLoading(false);
                }
            })();
        }
    }, [token]);

    const setAuthState = (data) => {
        setLoggedUser(data);
        setToken(data.token);
    };

    const handleError = (error) => {
        setError(error);
        throw error;
    };

    async function signUp(email, password) {
        try {
            const { data } = await clientAPI(authUrl, {
                method: 'POST',
                data: { email, password },
            });
            setAuthState(data);
            navigate('/');
            return data;
        } catch (err) {
            handleError(err);
        }
    }

    async function login(email, password) {
        console.log('login');
        try {
            const { data } = await clientAPI(authUrl, {
                method: 'POST',
                data: { email, password },
                headers: { 'Content-Type': 'application/json' },
            });
            setAuthState(data);
            navigate('/');
            return data;
        } catch (err) {
            handleError(err);
        }
    }

    async function logout() {
        try {
            const res = await clientAPI(authUrl, { method: 'GET', token });
            setLoggedUser(null);
            setToken(null);
            if (res.data.status === 'success') {
                navigate(0);
            }
        } catch (err) {
            handleError(err);
        }
    }

    const values = {
        token,
        signUp,
        login,
        logout,
        error,
        loggedUser,
        isLoading,
    };

    return (
        <AuthUserContext.Provider value={values}>
            {children}
        </AuthUserContext.Provider>
    );
}
