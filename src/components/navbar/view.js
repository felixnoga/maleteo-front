import React from "react";
import {BrowserRouter as Router, Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faSearch, faUser, faComments} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary d-none d-md-flex">
                <Link className="navbar-brand text-white" to='/'>Maleteo</Link>
                <button className="navbar-toggler text-white" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link text-white" to='/'>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to='/signin'>Sign In</Link>
                        </li>
                    </ul>
                </div>
            </nav>



            <nav className="navbar navbar-expand-lg fixed-bottom navbar-light bg-white d-md-none">
                <Link className="nav-link text-dark" to="/"><FontAwesomeIcon icon={faHome} size={'2x'}/></Link>
                <Link className="nav-link text-dark" to="/"><FontAwesomeIcon icon={faSearch} size={'2x'}/></Link>
                <a className="nav-link text-dark" href="#"><FontAwesomeIcon icon={faComments} size={'2x'}/></a>
                <Link className="nav-link text-dark" to="/signin"><FontAwesomeIcon icon={faUser} size={'2x'}/></Link>


            </nav>
        </div>




    )
};

export default Navbar;
