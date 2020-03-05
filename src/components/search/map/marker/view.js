import React from "react";
import {faMapMarker} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Marker = ({color}) => {
    const style = {
        color: color
    };
    return (
        <FontAwesomeIcon icon={faMapMarker} size={"3x"} style={style}/>
    )
};

export default Marker;
