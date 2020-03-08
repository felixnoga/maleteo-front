import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from "./components/home/Home";
import Search from "./components/search";
import LoginForm from "./components/LoginForm";
import Login from "./components/Login";
import RegisterForm from './components/RegisterForm'
import ProfileComponent from "./components/profile";
import BookingComponent from "./components/booking";
import NotFound from './components/NotFound';
import Navbar from "./components/navbar";

import {GlobalContextProvider} from "./context/globalContext";

import './App.css'


function App() {
  return (
    <div className="App">

        <Router>
            <Navbar />
            <Switch>

                <Route exact path="/signin" component={Login} />
                <Route exact path="/login" component={LoginForm} />
                <Route exact path="/register" component={RegisterForm} />
                <Route exact path="/profile" component={ProfileComponent} />
                <Route exact path="/search" component={Search} />
                <Route exact path="/booking" component={BookingComponent} />
                <Route exact path="/" component={Home} />
                <Route component={NotFound} />

            </Switch>
        </Router>

    </div>
  )
}

export default App
