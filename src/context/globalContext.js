import React, {useState, useEffect} from "react";
import {getAllSites} from "../services/apiService";
import Axios from "axios";

export const GlobalContext = React.createContext();




export function GlobalContextProvider ({children}) {
    const [state, setState] = useState({
        currentBooking: {
            locationCoordinates: {},
            nearestSites: []
        },
        sites: []
    });




    useEffect(()=>{
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                setState({...state, currentBooking: {...state.currentBooking, locationCoordinates: {lat, lng}}});
                localStorage.setItem('currentLat', lat);
                localStorage.setItem('currentLng', lng);
                console.log("SI HAY GEOLOCATION");
            });
        } else {
            setState({...state, currentBooking: {...state.currentBooking, locationCoordinates: {lat:40, lon:-3}}});
            console.log("NO HAY GEOLOCATION");
        }


        Axios.get(`${process.env.REACT_APP_BACKEND_URL}/site/all`)
            .then ( (res)=>{
                const sites = res.data;
               setState({...state, sites});


            })
            .catch((e) => {
                console.log(e.message);
            });
        Axios.put(`${process.env.REACT_APP_BACKEND_URL}/site/nearest`, {lat: '40.44', lng: '-3.63'})
            .then(res => {
                const nearestSites = res.data;
                setState({...state, currentBooking: {...state.currentBooking, nearestSites}});
                localStorage.setItem('nearestSites', nearestSites);

            })
            .catch(e => {console.log(e)});


        //
        // const apiSites = async ()=>{
        //     const sites = await getAllSites();
        //     setState({...state, sites});

        // };
        // apiSites();
    }, []);




    return (
        <GlobalContext.Provider value={[state, setState]}>
            {children}
        </GlobalContext.Provider>
    )
}
