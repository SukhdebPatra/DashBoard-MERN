import React, { useEffect } from 'react'
import {useNavigate } from 'react-router-dom';


const Login=()=>{

    const [email,setEmail]=React.useState('');
    const [password,setPassword]=React.useState('');

    const nevigate=useNavigate();

    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            nevigate('/')
        }
    })

    const handleLogin= async()=>{
        console.log("email,password",email,password)

        let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({email, password }),
      headers: {
        "content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    if(result.auth){
        localStorage.setItem("user",JSON.stringify(result.user));
        localStorage.setItem("token",JSON.stringify(result.auth));
        nevigate('/')

    }else{
        alert('plz Enter currect details')
    }
    }
    

    return (
        <div className='login'>
            <input type='text' className='inputBox' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>

            <input type='password' className='inputBox' placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)}/>

            <button onClick={handleLogin} className='appbtn' type='button'>LogIn</button>
            

        </div>
    )
}

export default Login