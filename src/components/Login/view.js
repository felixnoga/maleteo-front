import React, { useContext } from 'react'
import { useCookies } from 'react-cookie'
import { AuthContext } from '../../context/AuthContext'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import LoginForm from '../LoginForm'
import RegisterForm from '../RegisterForm'
import ProfileComponent from "../profile";

import './style.scss'

const Login = () => {
  const [, , removeCookie] = useCookies(['token'])
  const [isAuthenticated] = useContext(AuthContext)

  
    if (!isAuthenticated) {
      return (
      <div className="container-fluid text-center">
        <Tabs>
          <TabList>
            <Tab>Iniciar Sesión</Tab>
            <Tab>Registrate</Tab>
          </TabList>

          <TabPanel>
            <LoginForm/>
          </TabPanel>
          <TabPanel>
            <RegisterForm/>
          </TabPanel>
        </Tabs>
      </div> ) }
      else {
        return ( <ProfileComponent/>)}

}

export default Login
