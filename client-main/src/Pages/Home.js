import React from 'react'

import { Routes, Route, Link } from "react-router-dom";
export default function Home() {
  const isLogin = localStorage.getItem("token")
    return(
      <>
        <div className='menu flex justify-between'>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 'bold',
        }}>CRUD FLOXY</h2>
        <div className='menu-item'>
          <Link className='mx-3' style={{

          fontSize: '20px',
          }} to="/">Home</Link>
          {isLogin == null ? <Link style={{  
          fontSize: '20px',
          }} to="/login">Login</Link> : <Link style={{

          fontSize: '20px',
          }} to="/profile">Profile</Link>}
        </div>
      </div>
    
      <h2 className='text-center my-10'>Login Before using this CRUD</h2>
      </>
    )
  }