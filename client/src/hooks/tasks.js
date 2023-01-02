import { createContext, useContext, useState, useEffect } from 'react';
import { clientAPI } from '../api/api.js';
import { useAuth } from './Auth.js';

const UserGrandParentsTasksContext = createContext({
    grandParentsGroup: null,
    getMyGrandParentsGroup: () => {},
});

export const useUserGrandParentsTasks = () =>
    useContext(UserGrandParentsTasksContext);

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
        <UserGrandParentsTasksContext.Provider value={values}>
            {children}
        </UserGrandParentsTasksContext.Provider>
    );
}
