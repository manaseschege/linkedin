import React, { useMemo, useState } from "react";
import "./index.scss";
import { onLogout } from "../../../api/AuthApi";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../../api/FirestoreApi";
import Button from "../Button";

export default function Popup() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div className="popup-card">
      <p className="name">{currentUser.name}</p>
      <p className="headline ">{currentUser.headline}</p>
      <Button
        title="view Profile"
        onClick={() =>
          navigate("/profile", {
            state: {
              id: currentUser?.id,
            },
          })
        }
      />
      <Button title="Log out" onClick={onLogout} />
    </div>
  );
}
