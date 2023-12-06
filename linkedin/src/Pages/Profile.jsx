import React, { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import ProfileComponent from "../components/ProfileComponent";
export default function Profile({ currentUser }) {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (!res?.accessToken) {
        navigate("/");
        setLoading(false);
      } else {
        return setLoading(false);
      }
    });
  }, []);

  return loading ? <Loader /> : <ProfileComponent currentUser={currentUser} />;
}
