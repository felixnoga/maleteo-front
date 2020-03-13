import React, {useContext} from "react";
import './style.scss';
import Map from "./map/Map";

import {GlobalContext} from "../../context/globalContext";

const Search = () => {
    const [globalContext, setGlobalContext] = useContext(GlobalContext);

    return(
        <div className="container-fluid pb-5">
            <h1>Encuentra tu guardián</h1>
            <Map/>
        </div>

    )
};

export default Search;
