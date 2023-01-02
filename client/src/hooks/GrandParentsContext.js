import { createContext, useContext, useState, useEffect } from 'react';
import { clientAPI } from '../api/api.js';
import { useAuth } from './Auth.js';

const UserGrandParentsContext = createContext({
    grandParents: null,
    getMyGrandParents: () => {},
});

export const useUserGrandParents = () => useContext(UserGrandParentsContext);

export function UserGrandParentsProvider({ children }) {
    const getAllGrandParentsUrl = '/admin/grandparents'; //Admin only
    const { token, loggedUser } = useAuth();
    const [myGrandParents, setMyGrandParents] = useState(null);

    let grandParentsID;
    if (loggedUser) {
        console.log(loggedUser.user);
        loggedUser.user.familyMember?.maternalGrandparents
            ? (grandParentsID =
                  loggedUser.user.familyMember.maternalGrandparents._id)
            : (grandParentsID =
                  loggedUser.user.familyMember?.paternalGrandparents._id);
    }

    console.log(grandParentsID);
    const myGrandParentUrl = `/grandparents/${grandParentsID}}`;
    // const getMeAsFamilyMember = async () => {
    //     try {
    //         const { data } = await clientAPI(grandParentUrl, {
    //             method: 'GET',
    //             token,
    //         });
    //         setGrandParents(data);
    //     } catch (err) {
    //         throw err;
    //     }
    // };

    useEffect(() => {
        const getAllGrandParents = async (myGrandParentUrl) => {
            try {
                const { data } = await clientAPI(myGrandParentUrl, {
                    method: 'GET',
                    token,
                });
                setMyGrandParents(data);
            } catch (err) {
                throw err;
            }
        };

        const getMyGrandParents = async (myGrandParentUrl) => {
            try {
                const { data } = await clientAPI(myGrandParentUrl, {
                    method: 'GET',
                    token,
                });
                setMyGrandParents(data);
            } catch (err) {
                throw err;
            }
        };

        getMyGrandParents();
    }, [token, myGrandParentUrl]);

    const values = {
        myGrandParents,
    };

    return (
        <UserGrandParentsContext.Provider value={values}>
            {children}
        </UserGrandParentsContext.Provider>
    );
}
