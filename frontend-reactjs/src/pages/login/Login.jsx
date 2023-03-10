import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {CircularProgress} from '@mui/material';

import useAuth from "../../context/useAuth";
import { loginCall } from "../../APICalls";
import "./login.css";

export default function Login() {

  const navigate = useNavigate();
  const location = useLocation();
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useAuth(); 

  const submitHandler = (event) => {
    event.preventDefault();
    loginCall({ email: email.current.value, password: password.current.value }, dispatch).then(() => {
      navigate(location.state?.from.pathname);
    });
  }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">unSocial</h3>
          <span className="loginDesc">
            Lets connect virtually, let's unSocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={submitHandler}>
            <input 
            type="email" 
            placeholder="Email" 
            ref={email}
            className="loginInput" 
            required />
            <input 
            type="password"
            minLength="6"
            ref={password}
            placeholder="Password" 
            className="loginInput" 
            required />
            <button type="submit" className="loginButton" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="30px" /> : "Log In"}</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton" disabled={isFetching}>
              {isFetching ? <CircularProgress color="inherit" size="30px" /> : "Create New Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}