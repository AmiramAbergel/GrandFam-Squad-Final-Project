import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Layout from '../components/UI/Layout/Layout.js';
import { useAuth } from '../hooks/Auth.js';
import GrandparentsMapView from '../pages/GrandparentsMapView.js';
import ScoreTablePage from '../pages/ScoreTablePage.js';
const REDIRECT_PAGE = '/';
const MainRoutes = (props) => {
    const navigate = useNavigate();
    const { loggedUser, isLoading } = useAuth();
    const [dataIsLoading, setDataisLoading] = useState(true);
    // Listen for changes to loading and authUser, redirect if needed
    useEffect(() => {
        if (isLoading && loggedUser === null) {
            navigate(REDIRECT_PAGE);
        }
    }, [loggedUser, isLoading, navigate]);
    return (
        <Layout>
            <Routes>
                <Route
                    path='/score'
                    element={
                        !loggedUser || dataIsLoading ? (
                            'Loading...'
                        ) : (
                            <ScoreTablePage />
                        )
                    }
                />

                <Route
                    path='/map'
                    element={
                        !loggedUser || dataIsLoading ? (
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
