import GoogleMapReact from 'google-map-react';
import { useState } from 'react';
import LocationInfoBox from './MapDetails/LocationInfoBox.js';
import LocationMarker from './MapDetails/LocationMarker.js';
import styled from '@emotion/styled';
import { useUserGrandParents } from '../../hooks/GrandParentsGroupContext.js';
const StyledMap = styled.div`
    width: calc(100% - 100px);
    height: 65vh;
    position: relative;
`;

const Map = ({ center, zoom }) => {
    const { myGroup } = useUserGrandParents();
    const [locationInfo, setLocationInfo] = useState(null);
    const markers = myGroup.location.map(({ name, lat, lng }, i) => {
        console.log(myGroup.location);
        return (
            <LocationMarker
                key={i}
                name={name}
                lat={lat}
                lng={lng}
                onClick={() => setLocationInfo({ id: i, title: name })}
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
