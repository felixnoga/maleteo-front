import React, {useState, useEffect} from "react";
import {getAllSites} from "../services/apiService";

export const GlobalContext = React.createContext();




export function GlobalContextProvider ({children}) {
    const [state, setState] = useState({
        currentBooking: {},
        sites: []
    });

    const [currentBooking, setCurrentBooking] = useState({});
    useEffect(()=>{
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                setState({...state, currentBooking: {...state.currentBooking, locationCoordinates: {lat, lng}}});
                console.log("SI HAY GEOLOCATION");
            });
        } else {
            setState({...state, currentBooking: {...state.currentBooking, locationCoordinates: {lat:0, lon:0}}});
            console.log("NO HAY GEOLOCATION");
        }
        const apiSites = async ()=>{
            const sites = await getAllSites();
            setState({...state, sites});
        };
        apiSites();
    }, []);


    return (
        <GlobalContext.Provider value={[state, setState]}>
            {children}
        </GlobalContext.Provider>
    )
}
