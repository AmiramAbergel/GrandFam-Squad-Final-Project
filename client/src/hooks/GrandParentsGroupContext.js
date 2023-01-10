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
    const [myGrandparentsGroups, setMyGrandparentsGroups] = useState([]);
    const [myGroup, setMyGroup] = useState([]);

    useEffect(() => {
        const getAllGrandParents = async () => {
            try {
                const { data } = await clientAPI(`/users/me/grandparents`, {
                    method: 'GET',
                    token,
                });

                setMyGrandParents(data.data);
            } catch (err) {
                throw err;
            }
        };
        const getAllGrandParentsGroups = async () => {
            try {
                const { data } = await clientAPI(
                    `/users/me/grandparents?groups=true`,
                    {
                        method: 'GET',
                        token,
                    }
                );
                setMyGrandparentsGroups(data.data);
                console.log(data.data);
            } catch (err) {
                throw err;
            }
        };

        if (loggedUser?._id && loggedUser['myGrandparentsGroups'].length > 0) {
            console.log('loggedUser', loggedUser);
            getAllGrandParents();
            getAllGrandParentsGroups();
        } else {
            setMyGrandParents([]);
            setMyGrandparentsGroups([]);
        }
    }, [loggedUser, token]);

    // useEffect(() => {}, []);

    const values = {
        myGrandParents,
        myGrandparentsGroups,
        myGroup,
        setMyGroup,
    };

    return (
        <UserGrandParentsGroupContext.Provider value={values}>
            {children}
        </UserGrandParentsGroupContext.Provider>
    );
}
