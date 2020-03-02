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

  const [registerName, setRegisterName] = useState('')

  const [registerSurname, setRegisterSurname] = useState('')

  const PASSWORD_REGEXP = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/

  function handleEmail(e) {
    const { value } = e.target
    setRegisterForm({ ...registerForm, email: value.trim() })
  }

  function handleName(e) {
    const name = e.target.value.trim()

    setRegisterName(name)

    if (registerName) {
      const space = registerName.indexOf(' ')

      if (space > 0) {
        const firstName = registerName.slice(0, space).trim()
        const secondName = registerName.slice(space).trim()

        const formFirstName =
          firstName.charAt(0).toUpperCase() + firstName.slice(1)
        const formSecondName =
          secondName.charAt(0).toUpperCase() + secondName.slice(1)

        const fullName = formFirstName.concat(' ', formSecondName)

        setRegisterForm({ ...registerForm, name: fullName.trim() })
      } else if (space === -1) {
        const name =
          registerName.charAt(0).toUpperCase() + registerName.slice(1)

        setRegisterForm({ ...registerForm, name: name.trim() })
      }
    }
  }

  function handleSurname(e) {
    const surName = e.target.value.trim()

    setRegisterSurname(surName)

    if (registerSurname) {
      const space = registerSurname.indexOf(' ')

      if (space > 0) {
        const firstSurname = registerSurname.slice(0, space).trim()
        const secondSurname = registerSurname.slice(space).trim()

        const formFirstSurname =
          firstSurname.charAt(0).toUpperCase() + firstSurname.slice(1)
        const formSecondSurname =
          secondSurname.charAt(0).toUpperCase() + secondSurname.slice(1)

        const fullSurname = formFirstSurname.concat(' ', formSecondSurname)

        setRegisterForm({ ...registerForm, surname: fullSurname.trim() })
      } else if (space === -1) {
        const surname =
          registerSurname.charAt(0).toUpperCase() + registerSurname.slice(1)

        setRegisterForm({ ...registerForm, surname: surname.trim() })
      }
    }
  }

  function handlePassword(e) {
    const { value } = e.target

    if (!PASSWORD_REGEXP.test(value)) {
      console.log('contraseña no valida')
    } else {
      console.log('contraseña valida')
      setRegisterForm({ ...registerForm, password: value.trim() })
    }
  }

  function handleOfferts(e) {
    const checkbox = document.getElementById('register_ofertas__checkbox')
    let { offerts } = registerForm

    if (checkbox.className === 'unchecked') {
      checkbox.className = 'checked'
      offerts = true
    } else {
      checkbox.className = 'unchecked'
      offerts = false
    }
    setRegisterForm({ ...registerForm, offerts: offerts })
  }

  console.log(registerForm)

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

        <button
          disabled={
            !registerForm.name ||
            !registerForm.surname ||
            !registerForm.password
          }
          type="submit"
        >
          Registrarse
        </button>
      </form>
    </div>
  )
}

export default RegisterForm
