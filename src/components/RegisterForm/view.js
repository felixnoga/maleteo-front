import React, { useState, useEffect } from 'react'

import './style.scss'

function RegisterForm() {
  const [registerForm, setRegisterForm] = useState({
    email: '',
    name: '',
    surname: '',
    password: '',
    birthday: '',
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

    // console.log(name)

    // setRegisterName(name)

    if (name) {
      const space = name.indexOf(' ')

      if (space > 0) {
        const firstName = name.slice(0, space).trim()
        const secondName = name.slice(space).trim()

        const formFirstName =
          firstName.charAt(0).toUpperCase() + firstName.slice(1)
        const formSecondName =
          secondName.charAt(0).toUpperCase() + secondName.slice(1)

        const fullName = formFirstName.concat(' ', formSecondName)

        // console.log(fullName)
        setRegisterName(fullName)

        // setRegisterForm({ ...registerForm, name: fullName })
      } else if (space === -1) {
        const name = e.target.value.trim()

        const inputName = name.charAt(0).toUpperCase() + name.slice(1)

        setRegisterName(inputName)

        // setRegisterForm({ ...registerForm, name: inputName })
      }
    }

    // setRegisterForm({ ...registerForm, name: registerName })
  }

  function handleSurname(e) {
    const surname = e.target.value.trim()

    // setRegisterSurname(surName)

    if (surname) {
      const space = surname.indexOf(' ')

      if (space > 0) {
        const firstSurname = surname.slice(0, space).trim()
        const secondSurname = surname.slice(space).trim()

        const formFirstSurname =
          firstSurname.charAt(0).toUpperCase() + firstSurname.slice(1)
        const formSecondSurname =
          secondSurname.charAt(0).toUpperCase() + secondSurname.slice(1)

        const fullSurname = formFirstSurname.concat(' ', formSecondSurname)

        setRegisterSurname(fullSurname)
      } else if (space === -1) {
        const surname = e.target.value.trim()

        const inputSurname = surname.charAt(0).toUpperCase() + surname.slice(1)

        setRegisterSurname(inputSurname)
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

  function handleBirthday(e) {
    const birthday = e.target.value
    const year = birthday.slice(0, 4)
    const month = birthday.slice(5, 7)
    const day = birthday.slice(8, 10)

    const registerBirthday = year.concat(month).concat(day)

    setRegisterForm({ ...registerForm, birthday: registerBirthday })
  }

  function handleOfferts(e) {
    const checkbox = document.getElementById('advicesCheckbox')
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

  useEffect(() => {
    setRegisterForm({ ...registerForm, name: registerName })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerName])

  useEffect(() => {
    setRegisterForm({ ...registerForm, surname: registerSurname })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerSurname])

  console.log(registerForm)

  return (
    <div className="container-fluid" id="register_container">
      <form>
        <div className="col-12">
          <h3>Únete a Maleteo y disfruta de sus ventajas</h3>
        </div>

        <div className="form-group">
          <div className="col-sm-6">
            <label htmlFor="registerEmail">Correo Electronico</label>
            <input
              type="email"
              id="registerEmail"
              className="form-control form-control-sm  bg-white border-right-0 border-left-0 border-top-0"
              onChange={handleEmail}
            ></input>
          </div>
          <div className="col-sm-6">
            <label htmlFor="registerName">Nombre</label>
            <input
              type="text"
              id="registerName"
              className="form-control form-control-sm bg-white border-right-0 border-left-0 border-top-0"
              onChange={handleName}
            ></input>
          </div>
          <div className="col-sm-6">
            <label htmlFor="registerSurname">Apellido</label>
            <input
              type="text"
              id="registerSurname"
              className="form-control form-control-sm bg-white border-right-0 border-left-0 border-top-0"
              onChange={handleSurname}
            ></input>
          </div>
          <div className="col-sm-6">
            <label htmlFor="registerPassword">Contraseña</label>
            <input
              type="password"
              id="registerPassword"
              className="form-control form-control-sm bg-white border-right-0 border-left-0 border-top-0"
              onChange={handlePassword}
            ></input>
            <small id="passwordHelpBlock" className="form-text text-muted">
              La contraseña debe tener minimo 8 caracteres, mayusculas,
              minusculas y numeros
            </small>
          </div>
          <div className="col-sm-6">
            <label htmlFor="registerBirthday">Fecha de Nacimiento</label>
            <input
              type="date"
              id="registerBirthday"
              className="form-control form-control-sm bg-white border-right-0 border-left-0 border-top-0"
              onChange={handleBirthday}
              // onChange={handleSurname}
            ></input>
            <small id="passwordHelpBlock" className="form-text text-muted">
              Para registrarte tendrás que ser mayor de edad. Los usuarios no
              veran tu fecha de cumpleaños
            </small>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="checkbox"
              name="advicesCheckbox"
              id="advicesCheckbox"
              className="unchecked"
              onClick={handleOfferts}
            />
            <label htmlFor="advicesCheckbox" className="form-check-label">
              Quiero recibir consejos sobre como gestionar mi equipaje, ofertas,
              novedades y otros corres de Maleteo
            </label>
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary text-white"
              disabled={
                !registerForm.name ||
                !registerForm.surname ||
                !registerForm.password
              }
            >
              Registrarse
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm
