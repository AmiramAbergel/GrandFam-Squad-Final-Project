import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/UI/Layout/Layout.js';
import { useAuth } from '../hooks/Auth.js';
import { useUserGrandParents } from '../hooks/GrandParentsGroupContext.js';
import GrandparentsMapView from '../pages/GrandparentsMapView.js';
import GroupsPage from '../pages/GroupsPage.js';
import ScoreTablePage from '../pages/ScoreTablePage.js';
const REDIRECT_PAGE = '/';

const MainRoutes = (props) => {
    // const { myGrandParents } = useUserGrandParents();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    // Listen for changes to loading and authUser, redirect if needed

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
                    // element={
                    //     !isAuthenticated || !myGrandParents ? (
                    //         'Loading...'
                    //     ) : (
                    //         <ScoreTablePage data={myGrandParents} />
                    //     )
                    // }
                />
                <Route
                    path='/map'
                    element={
                        !isAuthenticated ? 'Loading...' : ''
                        //<GrandparentsMapView />
                    }
                />
            </Routes>
        </Layout>
    );
};
export default MainRoutes;
