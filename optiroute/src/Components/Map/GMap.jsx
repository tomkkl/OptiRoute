import React, { useState, useMemo } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const GMap = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDxtuA0Hdx5B0t4X3L0n9STcsGeDXNTYXY",
  });

  const center = useMemo(() => ({ lat: 40.7128, lng: -74.006 }), []);
  const favoritePlace = { lat: 40.748817, lng: -73.985428 };

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  return (
    <div className="App">
      {isLoaded ? (
        <GoogleMap
          center={center}
          mapContainerStyle={{
            width: "100%",
            height: "400px",
          }}
          zoom={15}
        >
          <Marker position={favoritePlace} />
        </GoogleMap>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default GMap;