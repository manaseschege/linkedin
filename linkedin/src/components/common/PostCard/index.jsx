import React, { useEffect, useMemo, useState } from "react";
import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import LikeButton from "../LikeButton";
import { BsPencil, BsTrash } from "react-icons/bs";
import {
  getAllUsers,
  getCurrentUser,
  deletePost,
  getConnections,
} from "../../../api/FirestoreApi";
import { Modal } from "antd";
export default function PostCard({ posts, id, getEditData }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [imageModal, setImageModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);
  useEffect(() => {
    getConnections(currentUser.id, posts.userID, setIsConnected);
  }, [currentUser.id, posts.userID]);

  return isConnected || currentUser.id === posts.userID ? (
    <div className="posts-card" key={id}>
      <div className="post-image-wrapper">
        {currentUser.id === posts.userID ? (
          <div className="action-container">
            <BsPencil
              size={20}
              className="action-icon"
              onClick={() => getEditData(posts)}
            />
            <BsTrash
              size={20}
              className="action-icon"
              onClick={() => deletePost(posts.id)}
            />
          </div>
        ) : (
          <></>
        )}

        <img
          className="profile-image"
          onClick={() => setImageModal(true)}
          src={
            allUsers
              .filter((item) => item.id === posts.userID)
              .map((item) => item.imageLink)[0]
          }
          alt="profile-image"
        />
        <div>
          <p
            className="name"
            onClick={() =>
              navigate("/profile", {
                state: { id: posts?.userID, email: posts.userEmail },
              })
            }
          >
            {allUsers.filter((user) => user.id === posts.userID)[0]?.name}
          </p>
          <p className="headline">
            {allUsers.filter((user) => user.id === posts.userID)[0]?.headline}
          </p>

          <p className="timestamp">{posts.timeStamp}</p>
        </div>
      </div>
      {posts.postImage ? (
        <img
          className="post-image"
          src={posts.postImage}
          alt="post-image"
          onClick={() => setImageModal(true)}
        />
      ) : (
        <></>
      )}
      <p
        className="status"
        dangerouslySetInnerHTML={{ __html: posts.status }}
      ></p>
      <LikeButton
        userId={currentUser?.id}
        postId={posts.id}
        currentUser={currentUser}
      />
      <Modal
        centered
        open={imageModal}
        onOk={() => setImageModal(false)}
        onCancel={() => setImageModal(false)}
        footer={[]}
      >
        <img
          className="post-image modal"
          src={posts.postImage}
          alt="post-image"
          onClick={() => setImageModal(true)}
        />
      </Modal>
    </div>
  ) : (
    <></>
  );
}
