import { useNavigate } from 'react-router-dom';
import { useUserGrandParents } from '../hooks/GrandParentsGroupContext.js';
import styled from '@emotion/styled';
import { useAuth } from '../hooks/Auth.js';

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

const Image = styled.img`
    width: 500px;
    height: 320px;
    object-fit: contain;
    margin-bottom: 2rem;
    border-radius: 5px;
`;

const GroupsPage = () => {
    const navigate = useNavigate();
    const { loggedUser } = useAuth();
    const { myGrandparentsGroups, setMyGroup, myGrandParents } =
        useUserGrandParents();
    console.log(loggedUser);
    const handleGroupClick = async (event) => {
        const groupID = event.target.value;
        let FilteredGroup = {};
        console.log(event);
        FilteredGroup = myGrandParents.find(
            (group) => group.familyID === groupID
        );
        console.log(FilteredGroup);
        await setMyGroup(FilteredGroup);
        navigate(REDIRECT_PAGE);
    };

    const handleNewGroup = () => {
        navigate('/');
    };
    console.log(myGrandparentsGroups);
    return (
        <>
            <h1>Hey! Please Choose group or create one</h1>
            <Image src={'https://thispersondoesnotexist.com/image '}></Image>
            <div>
                <StyledButton onClick={handleNewGroup}>
                    Create New Group
                </StyledButton>
            </div>
            {myGrandparentsGroups.length > 0 ? (
                <div>
                    <div>
                        {myGrandparentsGroups.map((group, i) => {
                            console.log(group.familyID);
                            return (
                                <StyledButton
                                    key={i}
                                    value={group.familyID}
                                    onClick={handleGroupClick}
                                >
                                    {group.familyName}
                                </StyledButton>
                            );
                        })}
                    </div>
                </div>
            ) : (
                ''
            )}
        </>
    );
};
export default GroupsPage;
