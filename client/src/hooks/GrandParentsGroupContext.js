import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { clientAPI } from '../api/api.js';
import { useAuth } from './Auth.js';
import Cookies from 'js-cookie';
const UserGrandParentsGroupContext = createContext({
    grandParentsGroup: null,
    getAllGrandParents: () => {},
    getAllGrandParentsGroups: () => {},
});

export const useUserGrandParents = () =>
    useContext(UserGrandParentsGroupContext);

export function UserGrandParentsGroupProvider({ children }) {
    const { loggedUser, isAuthenticated } = useAuth();
    const [myGrandParents, setMyGrandParents] = useState(null);
    const [myGrandParentsGroups, setMyGrandParentsGroups] = useState(null);
    const [myGroupID, setMyGroupID] = useState(null);
    const [myGroup, setMyGroup] = useState(null);

    const token = Cookies.get('token');
    const getAllGrandParents = async () => {
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
    const getAllGrandParentsGroups = async () => {
        try {
            const { data } = await clientAPI(
                `/users/${loggedUser._id}/grandparents?groups=true`,
                {
                    method: 'GET',
                    token,
                }
            );
            console.log(data.data);
            setMyGrandParentsGroups(data.data);
        } catch (err) {
            throw err;
        }
    };
    const filterChosenGroup = () => {
        let FilteredGroup = {};
        FilteredGroup = myGrandParents.find(
            (group) => group.familyID === myGroupID
        );

        setMyGroup(FilteredGroup);
    };
    useEffect(() => {
        if (loggedUser?._id) {
            getAllGrandParents();
            getAllGrandParentsGroups();
            if (myGrandParentsGroups && myGroupID) filterChosenGroup();
        } else {
            setMyGrandParents(null);
        }
    }, [loggedUser, token, myGroupID]);

    const values = {
        myGrandParents,
        myGrandParentsGroups,
        setMyGroupID,
        myGroup,
    };

    return (
        <UserGrandParentsGroupContext.Provider value={values}>
            {children}
        </UserGrandParentsGroupContext.Provider>
    );
}
