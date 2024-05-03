import React, { useState, useEffect } from 'react';
import { GoogleMap, MarkerF, useJsApiLoader} from '@react-google-maps/api';
import SearchComp from './SearchComp';



const containerStyle = {
  width: '600px',
  height: '400px'
};

const center = {
  lat: 17.4065,
  lng: 78.4772
};

const libraries = ['places'];

const MapWithMarkers = (props) => {
  const [isComponentVisible, setIsComponentVisible] = React.useState(false);
  const handleButtonClick = () => {
    setIsComponentVisible(true);
  };
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        libraries: libraries,
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
    
    <div>
    {props.mapWithSearch?<SearchComp type={"Search Pick Up Location"}/>:null}
    <br />
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={pickupLocation}
      zoom={15}
      onClick={handleMapClick}
      options={{
        zoomControl: false,
        fullscreenControl: false, // Disable full-screen control
        streetViewControl: false, // Disable street view control
        mapTypeControl: false, // Disable map type control
      }}
      
    >
      
      {pickupLocation && (
        <MarkerF // Use MarkerF instead of Marker
        position={pickupLocation}
        // Configure AdvancedMarker options here (refer to documentation)
      />
      )}
      
      
    </GoogleMap><br />
    {props.mapWithSearch?<SearchComp type={"Search Drop Location"}/>:null}
    
    
    </div>
    </> ):<></>
  ;
};

export default MapWithMarkers;
