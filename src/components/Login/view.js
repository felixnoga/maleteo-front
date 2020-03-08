import React, { useContext } from 'react'
import { useCookies } from 'react-cookie'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUserCheck, faUserCog} from '@fortawesome/free-solid-svg-icons'

import './style.scss'

const Login = () => {
  const [, , removeCookie] = useCookies(['token'])
  const [isAuthenticated, userdetails] = useContext(AuthContext)

  function handleLogout() {
    //Borra Cokie, de forma que ya no estes mas autenticado
    //Al borrar la cookie, automagicamente se invocara el UserEffect que tenemos en
    //el contexto authentication, y se actualizará ahí el valor de isAuthenticated
    removeCookie('token')
  }

  return (
    <div className="container-fluid profileContainer">
      <h1>Componente Sign-In </h1>
      <p>
        El componente es un "placeholder", todavia esta en construcción, hay que
        unificar todo en uno.  En la versión final esto será transparente, las opciones unificadas y no existirá.
      </p>
      <p>
        Este componente unificará en uno el login o el register, para no
        complicar la navbar inicial
      </p>
      <p> En caso de que estes ya autenticado, mostrará tus opciones profile</p>
      <p> Tambien permite hacer el logout para probar todo sin autenticacion</p>

      <br></br>
      <h2>Opciones</h2>
      <br></br>
      <Link to="/">Volver al home </Link>
      <FontAwesomeIcon icon={faHome} />

      {!isAuthenticated ? (
        <div>
          <h2>NO estas autenticado</h2>
          <Link to="/register">Registrarme por Primera vez </Link>
          <FontAwesomeIcon icon={faUserCog} />
          <br></br>
          <Link to="/login">Autenticarme </Link>
          <FontAwesomeIcon icon={faUserCheck} />
        </div>
      ) : (
        <div>
          <h2>Ya estas autenticado</h2>
          <Link to="/profile">Acceder a mi Perfil de Usuario </Link>
          <FontAwesomeIcon icon={faUserCog} />
          <br></br>
          <Link to="/">Volver al home </Link>
          <FontAwesomeIcon icon={faHome} />
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default Login
