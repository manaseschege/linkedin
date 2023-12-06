import React, { useMemo, useState } from "react";
import { getCurrentUser } from "../api/FirestoreApi";
import { Outlet } from "react-router-dom";
import Topbar from "../components/common/Topbar";

export default function MainLayout() {
  const [currentUser, setCurrentUser] = useState({});

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  return (
    <>
      <Topbar currentUser={currentUser} />
      <Outlet currentUser={currentUser} />
    </>
  );
}
