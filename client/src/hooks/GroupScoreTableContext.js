import { createContext, useContext, useState, useEffect } from 'react';
import { clientAPI } from '../api/api.js';
import { useAuth } from './Auth.js';
import Cookies from 'js-cookie';
import { useUserGrandParents } from './GrandParentsGroupContext.js';
const groupScoreTableContext = createContext({
    scoreTable: null,
    getScoreTable: () => {},
});

export const useGroupScoreTable = () => useContext(groupScoreTableContext);

export function GroupScoreTableProvider({ children }) {
    const { loggedUser, isAuthenticated } = useAuth();
    const { myGroup } = useUserGrandParents();
    const [scoreTableID, setScoreTableID] = useState(null);
    const [scoreTable, setScoreTable] = useState(null);

    const token = Cookies.get('token');
    const getScoreTable = async (id) => {
        try {
            const { data } = await clientAPI(`/score/${id}`, {
                method: 'GET',
                token,
            });
            setScoreTable(data.data);
        } catch (err) {
            throw err;
        }
    };

    useEffect(() => {
        if (myGroup && loggedUser?._id) {
            setScoreTableID(myGroup.familyScore);
            getScoreTable(myGroup.familyScore);
        } else {
            setScoreTable(null);
        }
    }, [myGroup, loggedUser]);

    const values = {
        scoreTable,
    };

    return (
        <groupScoreTableContext.Provider value={values}>
            {children}
        </groupScoreTableContext.Provider>
    );
}
