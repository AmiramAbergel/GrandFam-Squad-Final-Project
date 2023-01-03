import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Layout from '../components/UI/Layout/Layout.js';
import { useAuth } from '../hooks/Auth.js';
import { useUserGrandParents } from '../hooks/GrandParentsGroupContext.js';
import { useGroupScoreTable } from '../hooks/GroupScoreTableContext.js';
import GrandparentsMapView from '../pages/GrandparentsMapView.js';
import DndCalendar from '../pages/Schedule.js';

import ScoreTablePage from '../pages/ScoreTablePage.js';
const REDIRECT_PAGE = '/';

const MainRoutes = (props) => {
    const { myGroup } = useUserGrandParents();
    const { scoreTable } = useGroupScoreTable();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    // Listen for changes to loading and authUser, redirect if needed

    useEffect(() => {
        const cToken = Cookies.get('token');
        setToken(cToken);
        setLoading(!myGroup || !scoreTable);
        if (!cToken) {
            navigate(REDIRECT_PAGE);
        }
    }, [token, myGroup]);
    console.log('render');
    return (
        <Layout>
            <Routes>
                <Route
                    path='/score'
                    element={
                        !isAuthenticated || !loading ? (
                            '!!!Loading...'
                        ) : (
                            <ScoreTablePage />
                        )
                    }
                />
                <Route
                    path='/map'
                    element={
                        !isAuthenticated || !loading ? (
                            '!!!!Loading...'
                        ) : (
                            <GrandparentsMapView />
                        )
                    }
                />
                <Route
                    path='/schedule'
                    element={
                        !isAuthenticated || !loading ? (
                            '!!!!Loading...'
                        ) : (
                            <DndCalendar />
                        )
                    }
                />
            </Routes>
        </Layout>
    );
};
export default MainRoutes;
