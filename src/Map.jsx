import React from 'react'
import { useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsService, DirectionsRenderer  } from '@react-google-maps/api';

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
    googleMapsApiKey: "AIzaSyCqThBlVT0ACyc8Y_Cc9ESWSdw0VLA3x9g"
  })
  const [directions, setDirections] = React.useState(null);
  const [duration, setDuration] = React.useState('');
  const [distance, setDistance] = React.useState('');
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
    if (isLoaded) {
      const directionsService = new window.google.maps.DirectionsService();
      const origin = { lat: 17.440081, lng:  78.348915 };
      const waypoints = [
        { location: { lat: 17.4435, lng:  78.3772 }, stopover: true },
      ];
      const destination = { lat: 17.4875, lng: 78.3953 };

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          waypoints: waypoints,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
            const route = result.routes[0];
            const leg = route.legs[0];
            console.log(route);
            setDuration(leg.duration.text);
            setDistance(leg.distance.text);
          } else {
            console.error('Directions request failed:', status);
          }
        }
      );
    }
  }, [isLoaded]);


  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {directions && <DirectionsRenderer directions={directions} />}
        <Marker position={{ lat: 17.4065, lng: 78.4772 }} />
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
      <div>
      <p>Duration: {duration}</p>
      <p>Distance: {distance}</p>
    </div>
    </>
      
  ) : <></>
}

export default React.memo(Map)