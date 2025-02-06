import React, { useEffect, useState } from 'react'
import './Sign.scss'
import { FcGoogle } from 'react-icons/fc'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setToken } from '../services/Token'

function Sign({getUser}) {

  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const navigate = useNavigate()


  
  const createAccaunt = (e) => {
     e.preventDefault()
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "first_name": name,
      "email_or_phone": email,
      "password":password
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("https://ecommercev01.pythonanywhere.com/user/register/", requestOptions)
      .then((response) => response.json())
      .then((result) => {        
        if(result?.email_or_phone){
          toast.error(result?.email_or_phone[0])
        }else if(result?.first_name){
          toast.error(result?.first_name)
        }else if(result?.password){
          toast.error(result?.password[0])
        }else if(result?.message){
          LoginAccaunt()
          setName("")
        }
      })
      .catch((error) => console.error(error));
  }


   const LoginAccaunt = (e) => {
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
          }
        })
        .catch((error) => console.error(error));
    }



  return (
    <div className='sign'>
      <div className="container">
        <div className="img">
          <img src="../public/images/sign.png" alt="" />
        </div>
        <div className="info">
          <h1>Create an account</h1>
          <p>Enter your details below</p>
          <form onSubmit={(e)=>{
            createAccaunt(e)
          }} action="">
            <input onChange={(e)=>{
               setName(e.target.value)
            }} type="text" placeholder='Name' />
            <div className="line"></div>
            <input onChange={(e)=>{
               setEmail(e.target.value)
            }} type="text" placeholder='Email or Phone Number' />
            <div className="line"></div>
            <input onChange={(e)=>{
               setPassword(e.target.value)
            }} type="text" placeholder='Password' />
            <div className="line"></div>
            <button type='submit'>Create Account</button>
            <div className="button">
              <button><FcGoogle className='btn' /> Sign up with Google</button>
            </div>
          </form>
          <p>Already have account? <Link to={'/login'}>Log in</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Sign
