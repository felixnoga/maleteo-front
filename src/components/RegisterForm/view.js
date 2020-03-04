import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { register } from '../../api/auth';

import './style.scss'

function RegisterForm({ history }) {

  const [cookies, setCookie] = useCookies(['token']);
  const { token } = cookies;
  const [error, setError] = useState(null);


  const [registerForm, setRegisterForm] = useState({
    email: '',
    name: '',
    surname: '',
    password: '',
    birthday: '',
    optIn: false
  })

  const [registerName, setRegisterName] = useState('')

  const [registerSurname, setRegisterSurname] = useState('')

  const PASSWORD_REGEXP = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await register(registerForm);
      console.log ("Tengo el token de autenticacion "+res.token)
      setCookie('token', res.token);
      // Al ponerse la cookie, se ejecutara el UserEffect del Contexto de Autenticacion
    } catch (e) {
      setError(e.message);
    }
  }
  
  useEffect(() => {
    console.log ("UseEffect de nuevo token o de cambio de history")
    if (token) {
      history.push('/profile');
    }
  }, [token, history]);


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
    const password = value.trim()

    if (!PASSWORD_REGEXP.test(password)) {
      console.log('contraseña no valida')
    } else {
      console.log('contraseña valida')
      setRegisterForm({ ...registerForm, password : password })
    }
  }

  function handleBirthday(e) {
    const birthday = e.target.value
    const year = birthday.slice(0, 4)
    const month = birthday.slice(5, 7)
    const day = birthday.slice(8, 10)

    const registerBirthday = year.concat(month).concat(day)
    //TODO Check at front that you are 18 years older !!!!

    setRegisterForm({ ...registerForm, birthday: registerBirthday })
  }

  function handleOptIn(e) {
    const checkbox = document.getElementById('advicesCheckbox')
    let {optIn } = registerForm

    if (checkbox.className === 'unchecked') {
      checkbox.className = 'checked'
      optIn = true
    } else {
      checkbox.className = 'unchecked'
      optIn = false
    }
    setRegisterForm({ ...registerForm, optIn: optIn })
  }

  console.log(registerForm)

  return (
    <div className="container-fluid" id="register_container">
      <form onSubmit={handleSubmit}>
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
              onClick={handleOptIn}
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
                !registerForm.email ||
                !registerForm.name ||
                !registerForm.surname ||
                !registerForm.password
              }
            >
              Registrarse
            </button>
          </div>
        </div>
        {error ? (
        <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>
      ) : null}
      </form>
    </div>
  )
}

export default RegisterForm
