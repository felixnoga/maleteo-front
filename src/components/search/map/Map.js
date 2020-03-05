import React, {useContext} from "react";
import GoogleMapReact from 'google-map-react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Marker from "./marker";
import {faMapMarker} from "@fortawesome/free-solid-svg-icons";
import {GlobalContext} from "../../../context/globalContext";



const Map = () => {
    const [globalState, setGlobalState] = useContext(GlobalContext);

    const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
    const defaultLocation = {
        center: {
            lat: globalState.currentBooking.locationCoordinates.lat,
            lng: globalState.currentBooking.locationCoordinates.lng
        },
        zoom: 15
    };
    console.log(API_KEY);
    return (

        <div className="container-fluid">
            <div style={{ height: '60vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY}}
                    defaultCenter={defaultLocation.center}
                    defaultZoom={defaultLocation.zoom}
                >
                    <Marker
                        lat={globalState.currentBooking.locationCoordinates.lat}
                        lng={globalState.currentBooking.locationCoordinates.lng}
                        color={'#e74c3c'}
                    />
                </GoogleMapReact>

            </div>
        </div>

    );
};

export default Map;
