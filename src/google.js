import React from 'react';
import jwt from "jsonwebtoken";
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
function LoginSuccess(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        Logout
      </button>
    </>
  );
}

const google = ({props}) => {
 
    return (
        <GoogleLogin
            onSuccess={credentialResponse => {
              const url = `https://sushmanaalla-banking-api2.onrender.com/account/create/${credentialResponse.name}/${credentialResponse.email}/''`;
    (async () => {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
    })();
              console.log(credentialResponse);
              localStorage.setItem("token", credentialResponse.credential);
          const token = localStorage.getItem("token");
          const account = jwt.decode(token);
          console.log(account)
          account.balance=100
          localStorage.setItem("token1", account.name);
          localStorage.setItem("token2", account.balance);
          
          alert(`Login Successful, Welcome back ${account.name}!`);
          
          
          
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
    )
}

export default google;