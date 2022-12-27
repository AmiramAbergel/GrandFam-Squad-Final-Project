const LocationInfoBox = ({ info }) => {
    return (
        <div className='location-info'>
            <h2>Location Detail: </h2>
            <ul>
                <li>
                    ID: <strong>{info.id}</strong>
                </li>
                <li>
                    Location Name: <strong>{info.title}</strong>
                </li>
            </ul>
        </div>
    );
};

export default LocationInfoBox;
