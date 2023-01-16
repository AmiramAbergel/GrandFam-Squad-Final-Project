import GoogleMapReact from 'google-map-react';
import { useEffect, useState } from 'react';
import LocationInfoBox from './MapDetails/LocationInfoBox.js';
import LocationMarker from './MapDetails/LocationMarker.js';
import styled from '@emotion/styled';
import { useUserGrandParents } from '../../hooks/GrandParentsGroupContext.js';
const StyledMap = styled.div`
    /* Center the map on the page */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* Set dimensions of the map */
    width: calc(100% - 600px);
    height: 65vh;
    /* Add background color and border */
    background-color: white;
    border: 1px solid lightgrey;
    /* Add shadow */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    /* Add rounded corners */
    border-radius: 5px;
    /* Add animation */
    animation: fadeIn 3s ease-in-out;
    @media (max-width: 768px) {
        width: calc(100% - 50px);
        height: 75vh;
    }
`;

const Map = ({ center, zoom }) => {
    const { myGroup } = useUserGrandParents();
    console.log('myGroup', myGroup);
    const [locationInfo, setLocationInfo] = useState(null);
    const [updateCounter, setUpdateCounter] = useState(0);
    const [markerPositions, setMarkerPositions] = useState(
        myGroup.location.map(({ lat, lng }) => ({ lat, lng }))
    );

    useEffect(() => {
        let animationInterval;
        // Move markers to new positions
        const updateMarkerPositions = () => {
            if (updateCounter < 15) {
                // 15 updates in order to move the markers with limit of 15 new locations.
                // calculate new positions for markers
                const newMarkerPositions = markerPositions.map(
                    ({ lat, lng }) => {
                        return {
                            lat: lat + 0.0001,
                            lng: lng + 0.0001,
                        };
                    }
                );
                setMarkerPositions(newMarkerPositions);
                // increment update counter
                setUpdateCounter(updateCounter + 1);
            } else {
                // Stop the animation
                clearInterval(animationInterval);
            }
        };

        animationInterval = setInterval(updateMarkerPositions, 1000);

        return () => clearInterval(animationInterval);
    }, [markerPositions, updateCounter]);

    const markers = markerPositions.map(({ lat, lng }, i) => {
        return (
            <LocationMarker
                key={i}
                idx={i}
                lat={lat}
                lng={lng}
                onClick={() =>
                    setLocationInfo({ id: i, title: myGroup.location[i].name })
                }
            />
        );
    });

    return (
        <StyledMap>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                }}
                defaultCenter={center}
                defaultZoom={zoom}
            >
                {markers}
            </GoogleMapReact>
            {locationInfo && <LocationInfoBox info={locationInfo} />}
        </StyledMap>
    );
};

Map.defaultProps = {
    // Default props for the Map component
    center: {
        lat: 32.0940605515037,
        lng: 34.77098020928202,
    },
    zoom: 15,
};

export default Map;
