import React, {useContext} from "react";
import GoogleMapReact from 'google-map-react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarker} from "@fortawesome/free-solid-svg-icons";
import {GlobalContext} from "../../context/globalContext";

const style = {
    color: 'red'
};
const AnyReactComponent = ({ text }) => <FontAwesomeIcon icon={faMapMarker} size={"3x"} style={style}/>;
const Map = () => {
    const [state, setState] = useContext(GlobalContext);
    console.log(state);

    const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
    const defaultLocation = {
        center: {
            lat: 40.416775,
            lng: -3.703790
        },
        zoom: 12
    };
    console.log(API_KEY);
    return (

        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY}}
                defaultCenter={defaultLocation.center}
                defaultZoom={defaultLocation.zoom}
            >
                <AnyReactComponent
                    lat={40.416775}
                    lng={-3.703790}
                    text="My Marker"
                />
            </GoogleMapReact>

        </div>
    );
};

export default Map;
