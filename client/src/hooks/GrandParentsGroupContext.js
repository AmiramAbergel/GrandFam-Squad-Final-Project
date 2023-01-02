import { createContext, useContext, useState, useEffect } from 'react';
import { clientAPI } from '../api/api.js';
import { useAuth } from './Auth.js';

const UserGrandParentsGroupContext = createContext({
    grandParentsGroup: null,
    getMyGrandParentsGroup: () => {},
});

export const useUserGrandParents = () =>
    useContext(UserGrandParentsGroupContext);

export function UserGrandParentsGroupProvider({ children }) {
    const { token, loggedUser } = useAuth();
    const [myGrandParents, setMyGrandParents] = useState(null);

    useEffect(() => {
        const loggedUserID = loggedUser?.user?._id;

        const getAllGrandParentsGroups = async () => {
            try {
                const { data } = await clientAPI(
                    `/users/${loggedUserID}/grandparents`,
                    {
                        method: 'GET',
                        token,
                    }
                );
                console.log(data);
                setMyGrandParents(data);
            } catch (err) {
                throw err;
            }
        };
        getAllGrandParentsGroups();
    }, []);

    const values = {
        myGrandParents,
    };

    return (
        <UserGrandParentsGroupContext.Provider value={values}>
            {children}
        </UserGrandParentsGroupContext.Provider>
    );
}
