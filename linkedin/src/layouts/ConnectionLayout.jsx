import React, { useMemo, useState } from "react";

import Topbar from "../components/common/Topbar";
import { getCurrentUser } from "../api/FirestoreApi";
import Connections from "../Pages/Connections";
import { Outlet } from "react-router-dom";

export default function ConnectionLayout() {
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <>
      <Topbar currentUser={currentUser} />
      {/* <Connections currentUser={currentUser} /> */}
      <Outlet />
    </>
  );
}
