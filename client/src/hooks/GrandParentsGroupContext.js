import { createContext, useContext, useState, useEffect } from 'react';
import { clientAPI } from '../api/api.js';
import { useAuth } from './Auth.js';
import Cookies from 'js-cookie';
const UserGrandParentsGroupContext = createContext({
    // grandParentsGroup: null,
    // myGroup: null,
    // getAllGrandParents: () => {},
    // getAllGrandParentsGroups: () => {},
    // setMyGroup: () => {},
});

export const useUserGrandParents = () =>
    useContext(UserGrandParentsGroupContext);

export function UserGrandParentsGroupProvider({ children }) {
    const { loggedUser, isAuthenticated } = useAuth();
    const [myGrandParents, setMyGrandParents] = useState(null);
    const [myGrandParentsGroups, setMyGrandParentsGroups] = useState(null);
    const [myGroup, setMyGroup] = useState(null);

    const token = Cookies.get('token');

    useEffect(() => {
        const getAllGrandParents = async () => {
            try {
                const { data } = await clientAPI(
                    `/users/${loggedUser._id}/grandparents`,
                    {
                        method: 'GET',
                        token,
                    }
                );

                setMyGrandParents(data.data);
            } catch (err) {
                throw err;
            }
        };
        const getAllGrandParentsGroups = async () => {
            try {
                const { data } = await clientAPI(
                    `/users/${loggedUser._id}/grandparents?groups=true`,
                    {
                        method: 'GET',
                        token,
                    }
                );
                setMyGrandParentsGroups(data.data);
            } catch (err) {
                throw err;
            }
        };

        if (loggedUser?._id) {
            getAllGrandParents();
            getAllGrandParentsGroups();
        } else {
            setMyGrandParents(null);
            setMyGrandParentsGroups(null);
        }
    }, [loggedUser, token, myGroup]);

    // useEffect(() => {}, []);

    const values = {
        myGrandParents,
        myGrandParentsGroups,
        myGroup,
        setMyGroup,
    };

    return (
        <UserGrandParentsGroupContext.Provider value={values}>
            {children}
        </UserGrandParentsGroupContext.Provider>
    );
}
