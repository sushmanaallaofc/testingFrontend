import { useState } from "react";
import Card from "../components/card.js";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import GoogleLogin from 'react-google-login';
const Login = () => {
  //shows input fields and hides them after from submitted
  const [show, setShow] = useState(true);
  //sets error messsage
  const [status, setStatus] = useState("");

  return (
    <Card
     hdrcolor="#ACADAF"
   hdrtext="black"
   bodycolor="#40485d"
   bodytext="white"
      header="Login"
      status={status}
      body={
        show ? (
          <LoginForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <LoginSuccess setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  );
};
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
const LoginForm = props => {
  //sets account properties
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //for enabling submit button
  const [validTransaction, setValidTransaction] = useState(false);
  //for redirect after login
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;
    if (password.length < 8) {
      alert("Password Requires a minimum of 8 Characters!");
      return;
    }
    fetch(
      `https://sushmanaalla-banking-api2.onrender.com/account/login/${email}/${password}`
    )
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          localStorage.setItem("token", data.account);
          const token = localStorage.getItem("token");
          const account = jwt.decode(token);
          localStorage.setItem("token1", account.name);
          localStorage.setItem("token2", account.balance);
          props.setStatus("");
          props.setShow(false);
          alert(`Login Successful, Welcome back ${account.name}!`);
          props.setShow(false);
          clearForm();
          navigate("/");
        } catch (err) {
          props.setStatus(text);
          console.log("err:", text);
        }
      });
  };

  const enableSubmit = () => {
    if (email === "" || password === "") {
      setValidTransaction(false);
    } else setValidTransaction(true);
  };

  const validate = (field, label) => {
    if (!field) {
      props.setStatus("Error: " + label);
      setTimeout(() => props.setStatus(""), 3000);
      return false;
    }
    return true;
  };

  const clearForm = () => {
    setEmail("");
    setPassword("");
    setValidTransaction(false);
  };
  const handleGoogleLogin = async googleData => {
    const res = await fetch("https://sushmanaalla-banking-api2.onrender.com/api/v1/auth/google", {
      mode: 'no-cors',    
    method: "POST",
        body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    // store returned user somehow
  }
  return (
    <form>
      <label>Email address</label>
      <input
        type="input"
        className="form-control"
        id="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => {
          setEmail(e.currentTarget.value);
          enableSubmit();
        }}
      />
      <label>Password</label>
      <input
        type="password"
        className="form-control"
        id="password"
        placeholder="Enter password"
        autoComplete="current-password"
        value={password}
        onChange={e => {
          setPassword(e.currentTarget.value);
          enableSubmit();
        }}
      />
      <GoogleLogin
    clientId="776399895709-3ddui6f51u8capadvdlsh0nejmk2ph8f.apps.googleusercontent.com"
    buttonText="Log in with Google"
    onSuccess={handleGoogleLogin}
    onFailure={handleGoogleLogin}
    cookiePolicy={'single_host_origin'}
/>
      <br />
     <a style={{textDecoration:'underline',fontSize:'12px'}}>sign in with google</a>
      <button
        type="submit"
        className="form-control btn btn-light mb-1 mt-0"
        disabled={!validTransaction}
        onClick={handleLogin}
      >
        Submit
      </button>
    </form>
  );
};
export default Login;
