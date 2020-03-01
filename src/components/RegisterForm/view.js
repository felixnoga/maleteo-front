import React, { useState } from 'react'

import './style.sass'

function RegisterForm() {
  const [registerForm, setRegisterForm] = useState({
    email: '',
    name: '',
    surname: '',
    password: '',
    offerts: false
  })

  function handleEmail(e) {
    const { value } = e.target
    setRegisterForm({ ...registerForm, email: value })
    console.log(registerForm)
  }

  function handleName(e) {
    const { value } = e.target
    setRegisterForm({ ...registerForm, name: value })
  }

  function handleSurname(e) {
    const { value } = e.target
    setRegisterForm({ ...registerForm, surname: value })
  }

  function handlePassword(e) {
    const { value } = e.target
    setRegisterForm({ ...registerForm, password: value })
  }
  function handleOfferts(e) {
    let checkbox = document.getElementById('register_ofertas__checkbox')
    let { offerts } = registerForm

    if (checkbox.className === 'unchecked') {
      checkbox.className = 'checked'
      offerts = true
    } else {
      checkbox.className = 'unchecked'
      offerts = false
    }
    console.log(offerts)
    setRegisterForm({ ...registerForm, offerts: offerts })
  }

  //   console.log(registerForm)

  return (
    <div id="register_container">
      <h2>Únete a Maleteo y disfruta de sus ventajas</h2>

      <form>
        <label htmlFor="register_email">
          <p>Direccion de correo electrónico</p>
          <input
            type="email"
            name="register_email"
            id="register_email"
            onChange={handleEmail}
          />
        </label>
        <label htmlFor="register_name">
          <p>Nombre</p>
          <input
            type="text"
            name="register_name"
            id="register_name"
            onChange={handleName}
          />
        </label>
        <label htmlFor="register_surname">
          <p>Apellido</p>
          <input
            type="text"
            name="register_surname"
            id="register_surname"
            onChange={handleSurname}
          />
        </label>
        <label htmlFor="register_password">
          <p>Contraseña</p>
          <input
            type="password"
            name="register_password"
            id="register_password"
            onChange={handlePassword}
          />
        </label>
        {/* 
        ToDo = Crear input para fecha de nacimiento, ver npm react-datepicker */}

        <div>
          <label htmlFor="register_ofertas__checkbox">
            <input
              type="checkbox"
              name="register_ofertas__checkbox"
              id="register_ofertas__checkbox"
              className="unchecked"
              onClick={handleOfferts}
            />
            Recibe Ofertas
          </label>
        </div>

        <button type="submit">Registrarse</button>
      </form>
    </div>
  )
}

export default RegisterForm
