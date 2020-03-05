import React, { useContext } from 'react';
import { useCookies } from 'react-cookie'
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome} from '@fortawesome/free-solid-svg-icons';

import './style.scss'

const ProfileComponent = () => {
  const [, , removeCookie] = useCookies(['token'])
  const [isAuthenticated, userdetails] = useContext(AuthContext);
  //const isAuthenticated = useContext(AuthContext)

  function handleLogout() {
    //Borra Cokie, de forma que ya no estes mas autenticado
    //Al borrar la cookie, automagicamente se invocara el UserEffect que tenemos en
    //el contexto authentication, y se actualizará ahí el valor de isAuthenticated
    removeCookie('token')
  }


  if (isAuthenticated)
    return (
      <div>
        <h1>Este es el componente Profile</h1>
        <b> Estas autenticado en front como { userdetails.name } {userdetails.surname} </b><br></br>
        <b> Tu e-mail es {userdetails.email}</b><br></br>
        <b> Tu imagen de perfil esta en {userdetails.profile_img} </b><br></br>
        <b> Puedes cambiar tu imagen directamente en gravatar,  o editar tu perfil en tus preferencias para meter una nueva foto</b>
        <br></br><br></br>
        
        <b> En este componente deberas poder editar tu perfil de usuario </b>
        <b>
          {' '}
          Además, serás redigido a esta página automaticamente cuando te
          registres y obtengas tu cookie de autenticación
        </b>
        <b>
          {' '}
          No podras volver ir a la ruta de register o login, si existe la cookie, asi
          que si quieres volver, haz un logout para borrar la cookie{' '}
        </b> <br></br><br></br>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    )
  else
    return (
      <div>
      <h1>Este es el componente Profile</h1>
        <h3> Sigues en el mismo componente pero ya no estas autenticado</h3>
        <Link to="/">Volver al home </Link>
        <FontAwesomeIcon icon={faHome} />
      </div>
    )
}

export default ProfileComponent
