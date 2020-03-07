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
  //const isAuthenticated = useContext(AuthContext)

  //               <img src={userdetails.profile_img} class="rounded float-left" alt="Imagen Perfil"></img>

  function handleLogout() {
    //Borra Cokie, de forma que ya no estes mas autenticado
    //Al borrar la cookie, automagicamente se invocara el UserEffect que tenemos en
    //el contexto authentication, y se actualizará ahí el valor de isAuthenticated
    removeCookie('token')
  }

  if (isAuthenticated)
    return (
      <div class="container-fluid">
        <div class="row opcion pista">
        <div class="col pista1">
          </div>
          <div class="col pista2">
            <h1>{userdetails.name}</h1>
            <p>Puedes ver y editar tu perfil</p>
          </div>
          <div class="col profile pista3">
            <p>hola</p>
             <img src={userdetails.profile_img} class="rounded float-left w-25" alt="Imagen Perfil"></img>
          </div>
        </div>
        <div class="col pista4">
          </div>
        <div class="row">
          <div class="col">
            <div class="opcion">
              <h3>Convierte en guardian</h3>
              <p>Puedes ganar 400€ de media al mes</p>
            </div>
            <div class="opcion">
              <h3>Invita a tus amigos</h3>
              <p>Y podrás ganar descuentos para tí</p>
            </div>
            <div class="opcion">
              <h3>Créditos y descuentos</h3>
            </div>
            <div class="opcion">
              <h3>Publica tu anuncio o experiencia</h3>
            </div>
            <div class="opcion">
              <h3>Configuración</h3>
            </div>
            <div class="opcion">
              <h3>Ayuda</h3>
            </div>
          </div>
        </div>
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
