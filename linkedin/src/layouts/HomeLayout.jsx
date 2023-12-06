import React, { useMemo, useState } from "react";

import Topbar from "../components/common/Topbar";
import { getCurrentUser } from "../api/FirestoreApi";
import Home from "../Pages/Home";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <>
      <Topbar currentUser={currentUser} />
      {/* <Home currentUser={currentUser} /> */}
      <Outlet currentUser={currentUser} />
    </>
  );
}
