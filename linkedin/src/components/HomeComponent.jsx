import React from "react";
import PostStatus from "./common/PostUpdate";
import "../Sass/HomeComponent.scss";
export default function HomeComponent({ currentUser }) {
  return (
    <div className="home-component">
      <PostStatus currentUser={currentUser} />
    </div>
  );
}
