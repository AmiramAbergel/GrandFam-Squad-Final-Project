import { createContext, useContext, useState, useEffect } from 'react';
import { clientAPI } from '../api/api.js';
import { useAuth } from './Auth.js';

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
    const { loggedUser, token } = useAuth();
    const [myGrandParents, setMyGrandParents] = useState([]);
    const [myGrandParentsGroups, setMyGrandParentsGroups] = useState([]);
    const [myGroup, setMyGroup] = useState([]);

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

        if (loggedUser?._id && loggedUser?.myGrandparentsGroups > 0) {
            getAllGrandParents();
            getAllGrandParentsGroups();
        } else {
            setMyGrandParents([]);
            setMyGrandParentsGroups([]);
        }
    }, [loggedUser]);

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