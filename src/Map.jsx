import React from 'react'
import { useEffect } from 'react';
import { GoogleMap, useJsApiLoader} from '@react-google-maps/api';

const containerStyle = {
  width: '600px',
  height: '400px'
};

const center = {
  lat: 17.4065,
  lng: 78.4772
};

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  })
  console.log("hello");
  const [origin, setOrigin] = React.useState(null);
  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      
      setOrigin({ lat: position.coords.latitude, lng: position.coords.longitude });
    }, (error) => {
      console.error("Error getting geolocation:", error);
    });
  }, []);

  


  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </>
      
  ) : <></>
}

export default React.memo(Map)