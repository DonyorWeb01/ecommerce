import React, { useState } from 'react'
import './Login.scss'
import { setToken } from '../services/Token';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login({ getUser }) {

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const navigate = useNavigate()


  const LoginAccaunt = (e) => {
    e.preventDefault()
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "email_or_phone": email,
      "password": password
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("https://ecommercev01.pythonanywhere.com/user/token/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.access) {
          setToken(result.access);
          setEmail("")
          setPassword("")
          getUser()
          toast.success("Siz tizimga kirdingiz!")
          navigate("/")
        } else {
          toast.info((result?.email_or_phone && result?.email_or_phone[0]) || (result?.password && result?.password[0]) || (result?.non_field_errors && result?.non_field_errors[0]))
        }
      })
      .catch((error) => console.error(error));
  }


  return (
    <div className='login'>
      <div className="container">
        <div className="img">
          <img src="../public/images/sign.png" alt="" />
        </div>
        <div className="info">
          <h1>Log in to Exclusive</h1>
          <p>Enter your details below</p>
          <form action="">
            <input onChange={(e) => {
              setEmail(e.target.value)
            }} type="text" placeholder='Email or Phone Number' />
            <div className="line"></div>
            <input onChange={(e) => {
              setPassword(e.target.value)
            }} type="text" placeholder='Password' />
            <div className="line"></div>
            <div className="btns">
              <button onClick={(e) => {
                LoginAccaunt(e)
              }} className='log'>Log In</button>
              <button className='forget'>Forget Password?</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
