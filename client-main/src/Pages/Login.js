import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

export default function Login() {
  const history = useNavigate();
    const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
   
   let res = fetch("http://localhost:2000/login", {
      method: "POST",
      headers: {  "Content-Type": "application/json" },
      body: JSON.stringify({ "email": email, "password": password  }),
   })
   res.then(res => res.json()).then(res => {
     if (res.status === 200) { 
       localStorage.setItem("tokenuser", res.token)
       window.location.href = "/profile"
     } else {
       alert(res.message)
     }
   })
  
  }
    return(
        <>
        <form className='flex flex-col' style={{
          margin: '0 auto',
          width: '400px',
        }}>
        <input className='my-10' style={{
          border: '1px solid black',
        }} type="text" placeholder='Masukan Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input style={{
border: '1px solid black',
        }} type="password" placeholder='Masukan Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className='my-10' style={{
          backgroundColor: 'black',
          color: 'white',
          border: 'none',
          height: '40px',
        }} onClick={handleSubmit}>Submit</button>
      </form>
        </>
    )
}