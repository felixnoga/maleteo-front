import React from 'react';
import Home from "./components/home/Home";
import {GlobalContextProvider} from "./context/globalContext";


function App() {
  return (
    <div className="App">
        <GlobalContextProvider>
            <Home/>
        </GlobalContextProvider>



    </div>
  );
}

export default App;
