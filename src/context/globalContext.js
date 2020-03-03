import React, {useState, useEffect} from "react";
import Axios from "axios";

export const GlobalContext = React.createContext();




export function GlobalContextProvider ({children}) {
    const [state, setState] = useState({});
    useEffect(()=>{
        Axios.get(`${process.env.REACT_APP_BACKEND_URL}/site/all`)
            .then ( (res)=>{
                setState({...state, sites: res.data});

            })
            .catch((e) => {
                console.log(e.message);
            })
    }, []);
    return (
        <GlobalContext.Provider value={[state, setState]}>
            {children}
        </GlobalContext.Provider>
    )
}
