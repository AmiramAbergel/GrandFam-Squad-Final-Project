import styled from '@emotion/styled';
const StyledLocationInfoBox = styled.div`
    position: absolute;
    top: 80px;
    right: 50px;
    width: 400px;
    min-height: 200px;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 10px;
    font-size: 18px;
    color: #fff;
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        padding: 5px 0;
    }
`;

const LocationInfoBox = ({ info }) => {
    return (
        <StyledLocationInfoBox>
            <h2>Location Detail: </h2>
            <ul>
                <li>
                    ID: <strong>{info.id}</strong>
                </li>
                <li>
                    Location Name: <strong>{info.title}</strong>
                </li>
            </ul>
        </StyledLocationInfoBox>
    );
};

export default LocationInfoBox;
