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
    const { isAuthenticated, token } = useAuth();

    // Listen for changes to loading and authUser, redirect if needed

    useEffect(() => {
        if (!token) {
            navigate(REDIRECT_PAGE);
        }
    }, []);
    console.log('render');
    return !token || !isAuthenticated || !scoreTable ? (
        '!!!Loading...'
    ) : (
        <Layout>
            <Routes>
                <Route
                    path='/score'
                    element={
                        !isAuthenticated || !scoreTable ? (
                            '!!!Loading...'
                        ) : (
                            <ScoreTablePage data={scoreTable} />
                        )
                    }
                />
                <Route
                    path='/map'
                    element={
                        !isAuthenticated || !myGroup ? (
                            '!!!!Loading...'
                        ) : (
                            <GrandparentsMapView />
                        )
                    }
                />
                <Route
                    path='/schedule'
                    element={
                        !isAuthenticated || !myGroup ? (
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
