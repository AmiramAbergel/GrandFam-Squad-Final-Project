import GoogleMapReact from 'google-map-react';
import { useState } from 'react';
import LocationInfoBox from './MapDetails/LocationInfoBox.js';
import LocationMarker from './MapDetails/LocationMarker.js';
const Map = ({ center, zoom }) => {
    const [locationInfo, setLocationInfo] = useState(null);

    // const markers = grandparentsData.map((attr) => {
    //     return attr.locationAddress.map(({ name, lat, lng }, i) => {
    //         return (
    //             <LocationMarker
    //                 key={i}
    //                 name={name}
    //                 lat={lat}
    //                 lng={lng}
    //                 onClick={() => setLocationInfo({ id: i, title: name })}
    //             />
    //         );
    //     });
    // });

    return (
        <div className='map'>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                }}
                defaultCenter={center}
                defaultZoom={zoom}
            >
                {/* {markers} */}
            </GoogleMapReact>
            {locationInfo && <LocationInfoBox info={locationInfo} />}
        </div>
    );
};

Map.defaultProps = {
    // Default props for the Map component
    center: {
        lat: 32.0940605515037,
        lng: 34.77098020928202,
    },
    zoom: 10,
};

export default Map;
