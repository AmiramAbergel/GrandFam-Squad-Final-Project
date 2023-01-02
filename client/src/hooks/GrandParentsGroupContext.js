import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { clientAPI } from '../api/api.js';
import { useAuth } from './Auth.js';
import Cookies from 'js-cookie';
const UserGrandParentsGroupContext = createContext({
    grandParentsGroup: null,
    getMyGrandParentsGroup: () => {},
});

export const useUserGrandParents = () =>
    useContext(UserGrandParentsGroupContext);

export function UserGrandParentsGroupProvider({ children }) {
    const { loggedUser, isAuthenticated } = useAuth();
    const [myGrandParents, setMyGrandParents] = useState(null);
    const token = Cookies.get('token');
    const getAllGrandParentsGroups = async () => {
        try {
            const { data } = await clientAPI(
                `/users/${loggedUser._id}/grandparents`,
                {
                    method: 'GET',
                    token,
                }
            );
            console.log(data.data);
            setMyGrandParents(data.data);
        } catch (err) {
            throw err;
        }
    };
    useEffect(() => {
        if (loggedUser?._id) {
            getAllGrandParentsGroups();
        } else {
            setMyGrandParents(null);
        }
    }, [loggedUser, token]);

    const values = {
        myGrandParents,
    };

    return (
        <UserGrandParentsGroupContext.Provider value={values}>
            {children}
        </UserGrandParentsGroupContext.Provider>
    );
}
