import React from 'react';
import Home from "./components/home/Home";
import {GlobalContextProvider} from "./context/globalContext";


import './App.css'


import RegisterForm from './components/RegisterForm'



function App() {
  return (
    <div className="App">
        <GlobalContextProvider>
            <Home/>
        </GlobalContextProvider>
      <RegisterForm />
    </div>
  )
}

export default App
