import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  //const { dispatch, isFetching } = useContext(Context);
  const [user, setUser] = useState({})
 
  // useEffect(()=>{
  //    localStorage.setItem("user", JSON.stringify(user))
  // }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    //dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:3000/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      console.log("res.data", res.data)
      !res.data.username && alert("Invalid User")
      res.data.username && localStorage.setItem("user", JSON.stringify(res.data))
      res.data.username && window.location.replace("/");
    } catch (err) {
      
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label className="loginLable">Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label className="loginLable">Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" >
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link"  to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}