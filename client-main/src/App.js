import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Detail from './Pages/Detail';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Profile from './Pages/Profile';

export default function App() {
  return (
    <div className='p-3'>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile  />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  )
}

