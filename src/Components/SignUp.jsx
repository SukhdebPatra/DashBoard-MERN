
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const  navigate=useNavigate();


   
    useEffect(()=>{
        const auth=localStorage.getItem('user')
        if(auth){
            navigate('/')

        }
    },[])

    
  


  const collectData = async () => {
    console.warn(name, email, password);
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    if(result){
        localStorage.setItem("user",JSON.stringify(result.result));
        localStorage.setItem("token",JSON.stringify(result.auth));
        navigate('/')

    }
  };


  return (
    <>
      <h1 style={{textAlign:'center',marginTop:'10px'}}>Register</h1>
      <div className="register">
      
        <input
          className="inputBox"
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="inputBox"
          type="text"
          placeholder="Enter Email"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="inputBox"
          type="password"
          placeholder="Enter Password"
        />

        <button onClick={collectData} className="appbtn" type="btn">
          Sign Up
        </button>
      </div>
    </>
  );
};

export default SignUp;
