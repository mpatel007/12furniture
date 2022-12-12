import react, { useEffect, createContext } from 'react';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import MainRoutes from './routes/MainRoutes';
import { ToastContainer, toast } from 'react-toastify';
import { useReducer } from 'react';
import { userReducer } from "../src/components/Reducers/userReducer"
// import GlobalStyle from './components/Common/globalStyles';


import useUser from './components/Hooks/useUser';
export const UserContext = createContext({});

function App() {

  const [user, userdispatch] = useReducer(userReducer, {
    isLoggedIn: false,
    cartCount:0,
    data: {}
  });
  const UserProviderContext = useUser(user, userdispatch);

  return (
    <>

      <ToastContainer />
      <UserContext.Provider value={UserProviderContext}>
        <Router>
          {/* <GlobalStyle /> */}
          <MainRoutes />
          {/* <GlobalStyle2 /> */}

        </Router>
      </UserContext.Provider>

    </>
  );
}

export default App;
