import React, { useMemo, useState } from "react";
import { getCurrentUser } from "../api/FirestoreApi";
import Topbar from "../components/common/Topbar";
import Profile from "../Pages/Profile";
import { Outlet } from "react-router-dom";

export default function ProfileLayout() {
  const [currentUser, setCurrentUser] = useState({});

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  return (
    <>
      <Topbar currentUser={currentUser} />
      {/* <Profile currentUser={currentUser} /> */}
      <Outlet currentUser={currentUser} />
    </>
  );
}
