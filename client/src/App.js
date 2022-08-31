import React, { createContext, useState } from 'react';
import Home from './pages/home/Home';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import UpdateGuest from './pages/home/UpdateGuest';
import Events from './pages/events/Events';
import OneEvent from './pages/events/OneEvent'
import Nav from './pages/nav/Nav'



export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: user ? true : false, user, setUser }}
    >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/update/:id' element={<UpdateGuest />} />
        <Route path='/events' element={<Events />} />
        <Route path='/create' element={<Register />} />
        <Route path='/events/:id/:title' element={<OneEvent />} />
        <Route path='/nav' element={<Nav />} />


      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
