import React from 'react'

import './style.sass'

function RegisterForm() {
  return (
    <div id="register_container">
      <h2>Únete a Maleteo y disfruta de sus ventajas</h2>

      <form>
        <label htmlFor="register_email">
          <p>Direccion de correo electrónico</p>
          <input type="email" name="register_email" id="register_email" />
        </label>
        <label htmlFor="register_name">
          <p>Nombre</p>
          <input type="text" name="register_name" id="register_name" />
        </label>
        <label htmlFor="register_surname">
          <p>Apellido</p>
          <input type="text" name="register_surname" id="register_surname" />
        </label>
        <label htmlFor="register_password">
          <p>Contraseña</p>
          <input
            type="password"
            name="register_password"
            id="register_password"
          />
        </label>
        {/* 
        ToDo = Crear input para fecha de nacimiento, ver npm react-datepicker */}

        <div>
          <label htmlFor="register_ofertas__checkbox">
            {' '}
            <input
              type="checkbox"
              name="register_ofertas__checkbox"
              id="register_ofertas__checkbox"
            />{' '}
            Recibe Ofertas
          </label>
        </div>

        <button type="submit">Registrarse</button>
      </form>
    </div>
  )
}

export default RegisterForm
