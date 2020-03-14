import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useHistory } from "react-router-dom"

import { login } from '../../api/auth'

import './style.scss'

function LoginForm() {
  let history = useHistory()
  const [cookies, setCookie] = useCookies(['token'])
  const { token } = cookies
  const [error, setError] = useState(null)

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const res = await login(loginForm)
      console.log(
        'En login form, Tengo el token de autenticacion ' +
          res.token +
          ' y pongo la cookie'
      )
      setCookie('token', res.token)
      // Al ponerse la cookie, se ejecutara el UserEffect del Contexto de Autenticacion
    } catch (e) {
      setError(e.message)
    }
  }

  useEffect(() => {
    console.log(
      'UseEffect de nuevo token o de cambio de history en formulario login'
    )
    if (token) {
      history.push('/profile')
    }
  }, [token, history])

  function handleEmail(e) {
    const { value } = e.target
    setLoginForm({ ...loginForm, email: value.trim() })
  }

  function handlePassword(e) {
    const { value } = e.target
    const password = value.trim()
    setLoginForm({ ...loginForm, password: password })
  }

  console.log(loginForm)

  return (
    <div className="container-fluid" id="register_container">
      <form onSubmit={handleSubmit}>
        <div className="col-12">
          <h3>Inicia Sesión ahora</h3>
        </div>
        <button class="loginBtn loginBtn--facebook">Login with Facebook</button>

        <button class="loginBtn loginBtn--google">Login with Google</button>

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

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary text-white"
              disabled={!loginForm.email || !loginForm.password}
            >
              login
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

export default LoginForm
