import React, { useContext } from 'react'
import { useCookies } from 'react-cookie'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

import './style.scss'

const ProfileComponent = () => {
  const [, , removeCookie] = useCookies(['token'])
  const [isAuthenticated, userdetails] = useContext(AuthContext)

  function handleLogout() {
    //Borra Cokie, de forma que ya no estes mas autenticado
    //Al borrar la cookie, automagicamente se invocara el UserEffect que tenemos en
    //el contexto authentication, y se actualizará ahí el valor de isAuthenticated
    removeCookie('token')
  }

  if (isAuthenticated)
    return (
      <div className="container-fluid profileContainer">
        <div className="row mt-3 text-justify">
          <div className="col-sm-3"></div>
          <div className="col col-sm-3 ml-2 ">
            <h1>{userdetails.name}</h1>
            <p>Puedes ver y editar tu perfil</p>
          </div>
          <div className="col col-sm-3">
            <img
              id="userPicture"
              src={userdetails.profile_img}
              alt={userdetails.name}
            />
          </div>
          <div className="col-sm-3"></div>
        </div>
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6 mt-5 text-left">
            <div className="row ">
              {!userdetails.isKeeper ? (
                <div className="col info">
                  <h3>
                    <a href="/toguardian" className="profileLink">
                      Convierte en guardian
                    </a>
                  </h3>
                  <p>Puedes ganar 400€ de media al mes</p>
                </div>
              ) : (
                <div className="col info">
                  <h3>
                    <a href="/sitios" className="profileLink">
                      Administra tus sitios
                    </a>
                  </h3>
                  <p>Da de alta y gestiona tus sitios</p>
                </div>
              )}
            </div>
            <div className="row">
              <div className="col info">
                <h3>Invita a tus amigos</h3>
                <p>Y podrás ganar descuentos para tí</p>
              </div>
            </div>
            <div className="row">
              <div className="col info">
                <h3>Créditos y descuentos</h3>
              </div>
            </div>
            <div className="row">
              <div className="col info">
                <h3>Publica tu anuncio o experiencia</h3>
              </div>
            </div>
            <div className="row">
              <div className="col info">
                <h3>Configuración</h3>
              </div>
            </div>
            <div className="row">
              <div className="col info">
                <h3>Ayuda</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  else
    return (
      <div>
        <h2>Este es el componente Profile, pero no estas autenticado</h2>
        <Link to="/">Volver al home </Link>
        <FontAwesomeIcon icon={faHome} />
      </div>
    )
}

export default ProfileComponent
