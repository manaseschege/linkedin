import React, { useState } from "react";
import { GoogleSignInApi, RegisterApi } from "../api/AuthApi";
import "../Sass/LoginComponent.scss";
import GoogleButton from "react-google-button";
import LinkedinLogo from "../assets/LinkedinLogo.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { postUserData } from "../api/FirestoreApi";
import { getUniqueId } from "../helpers/getUniqueId";

export default function RegisterComponent() {
  const [credentials, setCredentials] = useState({});
  const navigate = useNavigate();
  const register = async () => {
    try {
      let res = await RegisterApi(credentials.email, credentials.password);
      toast.success("Account Created!");
      postUserData({
        name: credentials.name,
        email: credentials.email,
        userID: getUniqueId(),
        imageLink: "https://source.unsplash.com/collection/928423/480x480",
      });
      navigate("/home");
      localStorage.setItem("userEmail", res.user.email);
    } catch (error) {
      toast.error("Cannot Create your Account");
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
        <h1 className="heading">Make the most of your professional life</h1>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, name: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Your Name"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email or Phone number"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password (6 or more characters)"
          />
        </div>

        <button onClick={register} className="login-btn">
          Agree & Join
        </button>
        <hr className="hr-text" data-content="or" />
        <GoogleButton className="google-btn" onClick={() => googleSignIn()} />
      </div>

      <div className="google-btn-container">
        <p className="go-to-signup">
          Already on LinkedIn?{" "}
          <span className="join-now" onClick={() => navigate("/")}>
            Sign in
          </span>{" "}
        </p>
      </div>
    </div>
  );
}
