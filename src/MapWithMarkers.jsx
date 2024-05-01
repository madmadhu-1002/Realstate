import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '600px',
  height: '400px'
};

const center = {
  lat: 17.4065,
  lng: 78.4772
};

const MapWithMarkers = (props) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      })
  const [pickupLocation, setPickupLocation] = useState(center);
  const [map, setMap] = React.useState(null);
  
    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
    
        setMap(map)
      }, [])
    
      const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
      }, [])
      const handleMapClick = (event) => {
        const clickedLocation = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        };

    // Logic to determine whether it's a pickup or drop point
    setPickupLocation(clickedLocation);
    props.location(clickedLocation);
    
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      
      setPickupLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
    }, (error) => {
      console.error("Error getting geolocation:", error);
    });
  }, []);
  
  
  return isLoaded ?(
    <>
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={pickupLocation}
      zoom={15}
      onClick={handleMapClick}
    >
      {pickupLocation && (
        <Marker
          position={pickupLocation}
          icon={{
            url: 'https://maps.google.com/mapfiles/kml/paddle/blu-blank.png',
            scaledSize: new window.google.maps.Size(32, 32),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(16, 32)
          }}
        />
      )}
      
    </GoogleMap>
    </> ):<></>
  ;
};

export default MapWithMarkers;
