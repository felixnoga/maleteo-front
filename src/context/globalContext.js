import React, {useState, useEffect} from "react";
import {getAllSites} from "../services/apiService";

export const GlobalContext = React.createContext();




export function GlobalContextProvider ({children}) {
    const [state, setState] = useState({ });

    const [currentBooking, setCurrentBooking] = useState({});
    useEffect(()=>{
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                // const lat = position.coords.latitude;
                // const lng = position.coords.longitude;
                const lat = 40.3;
                const lng = -3.7;
                setState({...state, currentBooking: {locationCoordinates: {lat:0, lng:0}}});
                console.log("SI HAY GEOLOCATION");
            });
        } else {
            setState({...state, currentBooking: {locationCoordinates: {lat:0, lon:0}}});
            console.log("NO HAY GEOLOCATION");
        }
        const apiSites = async ()=>{
            const sites = await getAllSites();
            setState({sites, currentBooking: {locationCoordinates: {lat:0, lng:0}}});

        };
        apiSites();
    }, []);


    return (
        <GlobalContext.Provider value={[state, setState]}>
            {children}
        </GlobalContext.Provider>
    )
}
