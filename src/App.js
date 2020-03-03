import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from "./components/home/Home";
import Search from "./components/search";
import LoginComponent from "./components/login";
import RegisterForm from './components/RegisterForm'
import ProfileComponent from "./components/profile";
import BookingComponent from "./components/booking";

import {GlobalContextProvider} from "./context/globalContext";


import './App.css'






function App() {
  return (
    <div className="App">

        <Router>
            <Switch>

                <Route exact path="/register" component={RegisterForm} />
                <Route exact path="/login" component={LoginComponent} />
                <Route exact path="/profile" component={ProfileComponent} />
                <Route exact path="/search" component={Search} />
                <Route exact path="/booking" component={BookingComponent} />
                <Route exact path="/" component={Home} />

            </Switch>
        </Router>

    </div>
  )
}

export default App
