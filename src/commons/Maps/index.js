import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap(props) {
  const info = {
    center: {
      lat: props.lat,
      lng: props.lng,
    },
  };

  return (
  // Important! Always set the container height explicitly
    <div style={{ height: '30vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBev6RyZJDJZXWKE-z6hquJRpRD66NfCqU' }}
        defaultCenter={info.center}
        defaultZoom={15}
      >
        <AnyReactComponent
          lat={info.center.lat}
          lng={info.center.lng}
          text={props.text}
        />
      </GoogleMapReact>
    </div>
  );
}
