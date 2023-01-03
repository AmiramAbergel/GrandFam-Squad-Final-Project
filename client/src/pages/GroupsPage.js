import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserGrandParents } from '../hooks/GrandParentsGroupContext.js';
const REDIRECT_PAGE = '/home';

const GroupsPage = () => {
    const { myGrandParents } = useUserGrandParents();
    console.log(myGrandParents);
    return (
        <div>
            <h1>Groups Page</h1>
        </div>
    );
};
export default GroupsPage;
