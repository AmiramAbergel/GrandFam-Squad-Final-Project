import { createContext, useContext, useEffect, useState } from 'react';
import { clientAPI } from '../api/api.js';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const signUpUrl = '/signup';
const loginUrl = '/login';
const logoutUrl = '/logout';
const loggedUserUrl = '/users/me';

const REDIRECT_PAGE = '/my-groups';
const HOME_PAGE = '/';
const AuthUserContext = createContext({
    token: null,
    isAuthenticated: false,
    loggedUser: null,
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
        const token = Cookies.get('token');
        if (token) {
            (async () => {
                try {
                    const { data } = await clientAPI(loggedUserUrl, {
                        method: 'GET',
                        token,
                    });
                    setLoggedUser(data.data);
                    setToken(token);
                } catch (err) {
                    setError(err);
                } finally {
                    setIsLoading(false);
                }
            })();
        }
    }, []);

    const handleError = (error) => {
        setError(error);
        throw error;
    };

    async function signUp(email, password) {
        try {
            const { data } = await clientAPI(signUpUrl, {
                method: 'POST',
                data: { email, password },
            });
            setLoggedUser(data);
            navigate(REDIRECT_PAGE);
            return data;
        } catch (err) {
            handleError(err);
        }
    }

    async function login(email, password) {
        try {
            const { data } = await clientAPI(loginUrl, {
                method: 'POST',
                data: { email, password },
                headers: { 'Content-Type': 'application/json' },
            });

            Cookies.set('token', data.token); // store the token in a cookie
            setLoggedUser(data.user);
            navigate(REDIRECT_PAGE);
            return data;
        } catch (err) {
            handleError(err);
        }
    }

    async function logout() {
        try {
            const res = await clientAPI(logoutUrl, {
                method: 'POST',
                data: { loggedUser },
            });
            setLoggedUser(null);
            setIsLoading(true);
            Cookies.remove('token'); // remove the token cookie
            if (res.status === 'success') {
                navigate(HOME_PAGE);
            }
        } catch (err) {
            handleError(err);
        }
    }

    const values = {
        isAuthenticated: Boolean(loggedUser),
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
