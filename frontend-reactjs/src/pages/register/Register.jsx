import "./register.css";
import { useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function Register() {

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const cnfpwd = useRef(); // confirmPassword
  const navigate = useNavigate();
  const location = useLocation();

  const submitHandler = async (event) => {
    event.preventDefault();
    if(password.current.value !== cnfpwd.current.value) {
      cnfpwd.current.setCustomValidity("Password Doesn't Matches");
    } else {
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value
        };
        try {
          await axios.post("http://localhost:8080/api/auth/register", user);
          navigate(`${location.state ? location.state.from.pathname : '/'}`);
        } catch (error) {
          console.log(error);
        }
    }

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
            placeholder="Username"
            type="text"
            ref={username}
            className="loginInput"
            required />
            <input
            placeholder="Email"
            type="email"
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
            <input
            type="password"
            minLength="6"
            ref={cnfpwd}
            placeholder="Password Again" className="loginInput"
            required />
            <button type="Submit"
            className="loginButton"
            >Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}