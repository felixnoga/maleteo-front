import React from "react";
import {faMapMarker, faSuitcase} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './style.scss';

const Marker = (props) => {
    const style = {
        color: props.color
    };

    return (
        <>
        { props.$hover&&props.site ?  (
                <div className="marker-site">
                    <img src={props.site.space_img[0]} className="mr-3" alt="sitio" style={{width: '80px'}}/>
                            <h5 className="mt-0">{props.site.name}</h5>
                </div>

            ) : (
                <span className = "fa-stack text-center fa-2x">
                <FontAwesomeIcon icon={faSuitcase} size={"2x"} style={style}/>
                <strong className="fa fa-stack-1x text text-white site-number">{props.text}</strong>
            </span>
            )
        }
        </>

    )
};

export default Marker;
