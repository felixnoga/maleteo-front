import React, {useContext, useEffect, useState} from "react";
import {getNearestSites} from "../../../services/apiService";
import GoogleMapReact from 'google-map-react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Marker from "./marker";
import {useHistory} from 'react-router-dom';
import {GlobalContext} from "../../../context/globalContext";
import {AuthContext} from "../../../context/AuthContext";
import {faFileAlt} from "@fortawesome/free-regular-svg-icons";

import './style.scss';



const Map = () => {

    const [globalState, setGlobalState] = useContext(GlobalContext);
    const [isAuthenticated, userDetails] = useContext(AuthContext);
    const history = useHistory();
    useEffect(()=>{
        async function f() {
            const nearestSites = await getNearestSites(globalState.currentBooking.locationCoordinates);
            setGlobalState({...globalState, currentBooking: {...globalState.currentBooking, nearestSites}});
        }
        f();


    }, []);

    const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
    let defaultLocation;
    if (globalState.currentBooking.locationCoordinates && Object.entries(globalState.currentBooking.locationCoordinates).length !== 0) {


            defaultLocation = {
                center: {
                    lat: globalState.currentBooking.locationCoordinates.lat,
                    lng: globalState.currentBooking.locationCoordinates.lng

                },
                zoom: 13
            };
            console.log('en coordenadas de globalcontext');
    }

    else if (localStorage.getItem('currentLat')){
            defaultLocation = {
                center: {
                    lat: localStorage.getItem('currentLat'),
                    lng: localStorage.getItem('currentLng')

                },
                zoom: 13
            };
            console.log('en coordenadas de localstorage');
    }
    else {
        defaultLocation = {
            center: {
                lat: 40,
                lng: -3

            },
            zoom: 13
        };
        console.log('en coordenadas hardcodeadas');
    }



    const handleBookingOnClick = (id) => {
        setGlobalState({...globalState, selectedSite: {id}});
        history.push('/booking');
    };

    return (

        <div className="container-fluid">
            <div className="alert alert-light" role="alert">
                {globalState.currentBooking.locationAddress}
            </div>
            <div style={{ height: '60vh', width: '100%' }}>


                {
                    (defaultLocation) ? (


                        <GoogleMapReact
                            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY}}
                            defaultCenter={defaultLocation.center}
                            defaultZoom={defaultLocation.zoom}
                        >

                            <Marker
                                key="home"
                                lat={defaultLocation.center.lat}
                                lng={defaultLocation.center.lng}
                                color={'#e74c3c'}
                            />

                            {globalState.currentBooking.nearestSites
                                ?

                                globalState.currentBooking.nearestSites.map((site, i) => {
                                    return (
                                        <Marker
                                            key = {i}
                                            lat={site.location.coordinates[0]}
                                            lng={site.location.coordinates[1]}
                                            color={'#f68f24'}
                                            text={i+1}
                                            site = {site}
                                        />
                                        )

                                })


                                : null
                            }


                        </GoogleMapReact>
                    ) : <div>Cargando...</div>
                }


            </div>

            {globalState.currentBooking.nearestSites

                ? <div className="row mt-2">
                    {
                        globalState.currentBooking.nearestSites.map((site, i)=> {
                            return (

                                <div className="col-md-4 col-sm-6 col-lg-3 mb-2 equal" key={i}>
                                    <div className="card text-white bg-primary" >
                                        <img className="card-img-top" src={site.space_img[0]} alt="Card image cap" id="site-card-image"/>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-3">
                                                    <FontAwesomeIcon icon={faFileAlt} size="3x" />
                                                </div>
                                                <div className="col-9">
                                                    <h3 className="card-title"><span className="site-number">{i+1}</span> {site.name}</h3>
                                                    <hr/>
                                                    <h4>Descripción:</h4>
                                                    <p className="card-text text-justify">{site.description}</p>
                                                    <hr/>
                                                    <h4>Dirección:</h4>
                                                    <p className="card-text text-justify">{site.street}, {site.city}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body text-center">
                                            <hr className="article-divider"/>
                                            <button className="btn btn-primary text-white"
                                                    onClick={()=>handleBookingOnClick(site._id)}
                                            >Reservar Sitio</button>
                                            <div></div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                : <div className="text-center">Cargando...</div>
            }


        </div>

    );
};

export default Map;
