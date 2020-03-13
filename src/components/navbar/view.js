import React, {useContext} from "react";
import {Link, useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faSearch, faUser, faComments, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {AuthContext} from "../../context/AuthContext";
import {useCookies} from "react-cookie";

const Navbar = (props) => {
    const [isAuthenticated, user] = useContext(AuthContext);
    const [, ,removeCookie] = useCookies(['token']);
    const history = useHistory();
    const handleLogout = ()=> {
        removeCookie('token');
        history.push('/');

    };
    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary d-none d-md-flex pr-2">
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
                            {!isAuthenticated? <Link className="nav-link text-white" to='/signin'>Sign In</Link> : null}

                        </li>
                    </ul>
                    {user!==null && user!==undefined && isAuthenticated ? (


                        <ul className="nav navbar-nav ml-auto mr-4">

                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img src={user.profile_img} alt="user image" className="rounded-circle d-inline-block" style={{width: '30px'}}/> {user.name}
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right text-center" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to="/profile">My profile</Link>
                                    <button className="btn btn-primary text-white" onClick={handleLogout}>Logout</button>
                                </div>
                            </li>
                        </ul>
                    ): null}
                </div>
            </nav>



            <nav className="navbar navbar-expand-lg fixed-bottom navbar-light bg-white d-md-none">
                <Link className="nav-link text-dark" to="/"><FontAwesomeIcon icon={faHome} size={'2x'}/></Link>
                <Link className="nav-link text-dark" to="/"><FontAwesomeIcon icon={faSearch} size={'2x'}/></Link>
                <Link className="nav-link text-dark" to="#"><FontAwesomeIcon icon={faComments} size={'2x'}/></Link>
                {isAuthenticated
                    ? <Link className="nav-link text-dark" to="#" onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} size={'2x'}/></Link>
                    : <Link className="nav-link text-dark" to="signin"><FontAwesomeIcon icon={faUser} size={'2x'}/></Link>}

                {user!==null && user!==undefined && isAuthenticated ? (

                    <ul className="nav navbar-nav">

                        <li className="nav-item">
                            <Link className="nav-link" to="/profile" id="navbarDropdown" role="button"
                                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img src={user.profile_img} alt="user image" className="rounded-circle d-inline-block" style={{width: '30px'}}/> {user.name}
                            </Link>
                        </li>
                    </ul>
                ): null}


            </nav>
        </div>




    )
};

export default Navbar;
