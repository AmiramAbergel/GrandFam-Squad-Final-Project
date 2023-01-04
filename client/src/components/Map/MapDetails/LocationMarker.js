import { Icon } from '@iconify/react';
import styled from '@emotion/styled';
const StyledLocationMarker = styled.div`
    /* Add size and background color */
    width: 20px;
    height: 20px;
    background-color: blue;
    /* Add border and border radius */
    border: 2px solid white;
    border-radius: 50%;
    /* Add animation */
    animation: bounceIn 0.5s ease-in-out;

    @keyframes bounceIn {
        from {
            /* Style for the start of the animation */
            transform: scale(0);
        }
        to {
            /* Style for the end of the animation */
            transform: scale(1);
        }
    }
`;
const LocationMarker = ({ idx, lat, lng, name, onClick }) => {
    return (
        <StyledLocationMarker onClick={onClick}>
            {idx === 0 ? (
                <Icon
                    icon='emojione:old-woman-medium-skin-tone'
                    width='75'
                    height='86'
                />
            ) : (
                <Icon
                    icon='emojione:old-man-medium-skin-tone'
                    width='75'
                    height='85'
                />
            )}
        </StyledLocationMarker>
    );
};

export default LocationMarker;
