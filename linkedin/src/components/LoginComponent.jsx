import React, { useState } from "react";
import { GoogleSignInApi, LoginApi } from "../api/AuthApi";
import "../Sass/LoginComponent.scss";
import GoogleButton from "react-google-button";
import LinkedinLogo from "../assets/LinkedinLogo.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function LoginComponent() {
  const [credentials, setCredentials] = useState({});
  const navigate = useNavigate();
  const login = async () => {
    try {
      let res = await LoginApi(credentials.email, credentials.password);
      toast.success("Sign In to Linkedin!");
      localStorage.setItem("userEmail", res.user.email);
      navigate("/home");
    } catch (error) {
      toast.error("Please check your Credentials");
    }
  };
  const googleSignIn = () => {
    let response = GoogleSignInApi();
    navigate("/home");
  };
  return (
    <div className="login-wrapper">
      <img src={LinkedinLogo} className="linkedinLogo" />
      <div className="login-wrapper-inner">
        <h1 className="heading">Sign in</h1>
        <p className="sub-heading">Stay updated on your professional world</p>
        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email or Phone"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password"
          />
        </div>

        <button onClick={login} className="login-btn">
          Sign in
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
      <div className="google-btn-container">
        <GoogleButton className="google-btn" onClick={() => googleSignIn()} />
        <p className="go-to-signup">
          New to LinkedIn?{" "}
          <span className="join-now" onClick={() => navigate("/register")}>
            join now
          </span>{" "}
        </p>
      </div>
    </div>
  );
}
