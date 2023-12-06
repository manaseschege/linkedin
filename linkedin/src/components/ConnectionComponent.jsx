import React, { useEffect, useState } from "react";
import "../Sass/ConnectionComponent.scss";
import {
  addConnection,
  getAllUsers,
  getConnections,
} from "../api/FirestoreApi";
import ConnectedUsers from "./common/ConnectedUsers";
export default function ConnectionComponent({ currentUser }) {
  const [users, setUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    getAllUsers(setUsers);
  }, []);
  const getCurrentUser = (id) => {
    addConnection(currentUser.id, id);
  };
  useEffect((id) => {
    getConnections(currentUser.id, id);
  }, []);

  return isConnected ? (
    <></>
  ) : (
    <div className="connections-main">
      {users.map((user) => {
        return user.id === currentUser.id ? (
          <></>
        ) : (
          <ConnectedUsers user={user} getCurrentUser={getCurrentUser} />
        );
      })}
    </div>
  );
}
