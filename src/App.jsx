import React from 'react'
import MapWithMarkers from './MapWithMarkers';


const App = () => {
  const [isComponentVisible, setIsComponentVisible] = React.useState(false);
  const [pickupLocation, setPickupLocation] = React.useState(null);
  const [dropLocation, setDropLocation] = React.useState(null);
  
  
  const handleButtonClick = () => {
    setIsComponentVisible(true);
  };
  const confirmClick = ()=>{
    setIsComponentVisible(false);
  };
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      
      setPickupLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
    }, (error) => {
      console.error("Error getting geolocation:", error);
    });
  }, []);
  console.log("pickup");
  console.log(pickupLocation);
  console.log("drop");
  console.log(dropLocation);
  return (
    <>
    
    
    <div>
      

      <MapWithMarkers location={setPickupLocation} mapWithSearch={true}/>
      <button onClick={handleButtonClick}>Select on Map</button>
      {isComponentVisible && <MapWithMarkers location={setDropLocation} mapWithSearch={false}/>}
      <button onClick={confirmClick} hidden={!isComponentVisible}>Confirm Drop Point</button>
      
    </div>
    </>
  )
}

export default App