import React from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
export default function ConnectedUsers({ user, getCurrentUser }) {
  console.log(">>>", user);
  return (
    <div className="grid-child">
      <img src={user.imageLink} alt="user image" />
      <p className="name">{user.name}</p>
      <p className="headline">{user.headline}</p>
      <button onClick={() => getCurrentUser(user.id)}>
        <AiOutlineUsergroupAdd size={20} />
        connect
      </button>
    </div>
  );
}
