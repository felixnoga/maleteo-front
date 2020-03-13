import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {Route, Redirect} from "react-router-dom";

const SecuredRoute = (props) => {
    const [isAuthenticated, user] = useContext(AuthContext);
    if(isAuthenticated===null) {
        return <div>Cargando...</div>
    }

  return isAuthenticated ? <Route {...props} /> : <Redirect to={"/signin"} />
};

export default SecuredRoute;
