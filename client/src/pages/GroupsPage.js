import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserGrandParents } from '../hooks/GrandParentsGroupContext.js';
import styled from '@emotion/styled';
const REDIRECT_PAGE = '/score';

const StyledButton = styled.button`
    background-color: #39e991;
    border: none;
    color: #ffffff;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    &:hover {
        background-color: #67eeaa;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    border-radius: 4px;
`;

const GroupsPage = () => {
    const navigate = useNavigate();
    const { myGrandParentsGroups, setMyGroupID } = useUserGrandParents();

    const handleGroupClick = (groupID) => {
        setMyGroupID(groupID);
        navigate(REDIRECT_PAGE);
    };

    return (
        myGrandParentsGroups && (
            <div>
                <h1>Hey! Please Choose group or create one</h1>
                <div>
                    {myGrandParentsGroups.map((group, i) => {
                        console.log(group.familyID);
                        return (
                            <StyledButton
                                key={i}
                                onClick={() => handleGroupClick(group.familyID)}
                            >
                                {group.familyName}
                            </StyledButton>
                        );
                    })}
                </div>
                <div>
                    <StyledButton>Create New Group</StyledButton>
                </div>
            </div>
        )
    );
};
export default GroupsPage;
