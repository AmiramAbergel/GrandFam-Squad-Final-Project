import { Icon } from '@iconify/react';

const LocationMarker = ({ key, lat, lng, name, onClick }) => {
    console.log('test');
    return (
        <div className='location-marker' onClick={onClick}>
            {name === 'MC' ? (
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
        </div>
    );
};

export default LocationMarker;
