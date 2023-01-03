import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Layout from '../components/UI/Layout/Layout.js';
import { useAuth } from '../hooks/Auth.js';
import { useUserGrandParents } from '../hooks/GrandParentsGroupContext.js';
import { useGroupScoreTable } from '../hooks/GroupScoreTableContext.js';
import GrandparentsMapView from '../pages/GrandparentsMapView.js';
import GroupsPage from '../pages/GroupsPage.js';
import ScoreTablePage from '../pages/ScoreTablePage.js';
const REDIRECT_PAGE = '/';

const MainRoutes = (props) => {
    const { myGroup } = useUserGrandParents();
    const { scoreTable } = useGroupScoreTable();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    // Listen for changes to loading and authUser, redirect if needed
    console.log(scoreTable);
    useEffect(() => {
        const token = Cookies.get('token');
        console.log(token);
        if (!token) {
            navigate(REDIRECT_PAGE);
        }
    }, [navigate]);
    return (
        <Layout>
            <Routes>
                <Route
                    path='/score'
                    element={
                        !isAuthenticated || !scoreTable ? (
                            'Loading...'
                        ) : (
                            <ScoreTablePage />
                        )
                    }
                />
                <Route
                    path='/map'
                    element={
                        !isAuthenticated || !myGroup ? (
                            'Loading...'
                        ) : (
                            <GrandparentsMapView />
                        )
                    }
                />
            </Routes>
        </Layout>
    );
};
export default MainRoutes;
