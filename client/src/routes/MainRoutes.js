import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Layout from '../components/UI/Layout/Layout.js';
import { useAuth } from '../hooks/Auth.js';
import { useUserGrandParents } from '../hooks/GrandParentsGroupContext.js';
import { useGroupScoreTable } from '../hooks/GroupScoreTableContext.js';
import GrandparentsMapView from '../pages/GrandparentsMapView.js';
import DndCalendar from '../pages/Schedule.js';
import ScoreTablePage from '../pages/ScoreTablePage.js';
import TaskList from '../pages/TaskPage.js';
const REDIRECT_PAGE = '/';

const MainRoutes = () => {
    const { myGroup } = useUserGrandParents();
    console.log('myGroup', myGroup);
    const { scoreTable, usersInGroup } = useGroupScoreTable();
    console.log('Score', scoreTable);
    console.log('usersInGroup', usersInGroup);
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
                            <ScoreTablePage
                                scoreData={scoreTable}
                                usersData={usersInGroup}
                            />
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
                <Route
                    path='/assistance'
                    element={
                        !isAuthenticated || !myGroup ? (
                            '!!!!Loading...'
                        ) : (
                            <TaskList />
                        )
                    }
                />
            </Routes>
        </Layout>
    );
};
export default MainRoutes;
