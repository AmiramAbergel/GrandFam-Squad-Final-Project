import { createContext, useContext, useState, useEffect } from 'react';
import { clientAPI } from '../api/api.js';
import { useAuth } from './Auth.js';
import { useUserGrandParents } from './GrandParentsGroupContext.js';
const groupScoreTableContext = createContext({
    scoreTable: null,
    usersInGroup: null,
    getScoreTable: () => {},
});

export const useGroupScoreTable = () => useContext(groupScoreTableContext);

export function GroupScoreTableProvider({ children }) {
    const { loggedUser, token } = useAuth();
    const { myGroup } = useUserGrandParents();
    const [scoreTable, setScoreTable] = useState(null);
    const [usersInGroup, setUsersInGroup] = useState(null);

    useEffect(() => {
        const getScoreTable = async (fid) => {
            try {
                const { data } = await clientAPI(`/score/${fid}`, {
                    method: 'GET',
                    token,
                });
                setScoreTable(data.data);
                console.log(data.data);
            } catch (err) {
                throw err;
            }
        };

        if (myGroup && loggedUser) {
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
