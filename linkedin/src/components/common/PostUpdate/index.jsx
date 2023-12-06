import React, { useState, useMemo } from "react";
import "./index.scss";
import ModalComponent from "../Modal";
import { postStatus, getStatus, updatePost } from "../../../api/FirestoreApi";
import PostCard from "../PostCard";
import { v4 } from "react-uuid";
import { uploadPostImage } from "../../../api/ImageUpload";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import { getUniqueId } from "../../../helpers/getUniqueId";
import usePostDetails from "../../../hooks/usePostDetails";
export default function PostStatus({ currentUser }) {
  // const [modalOpen, setModalOpen] = useState(false);
  // const [status, setStatus] = useState("");
  const [allStatus, setAllStatus] = useState([]);
  // const [isEdit, setIsEdit] = useState(false);
  // const [currentPost, setCurrentPost] = useState({});
  const [postImage, setPostImage] = useState("");
 const {
   getEditData,
   modalOpen,
   status,
   isEdit,
   currentPost,
   setCurrentPost,
   setIsEdit,
   setModalOpen,
   setStatus,
 } = usePostDetails();
  const sendStatus = async () => {
    let object = {
      status: status,
      timeStamp: getCurrentTimeStamp("LLL"),
      userEmail: currentUser.email,
      userName: currentUser.name,
      postId: getUniqueId(),
      userID: currentUser.id,
      postImage: postImage,
    };

    await postStatus(object);
    await setModalOpen(false);
    setIsEdit(false);
    await setStatus("");
  };
  // const getEditData = (posts) => {
  //   setModalOpen(true);
  //   setStatus(posts?.status);
  //   setIsEdit(true);
  //   setCurrentPost(posts);
  // };
  const updateStatus = () => {
    updatePost(currentPost.id, status, postImage);
    setModalOpen(false);
  };
  useMemo(() => {
    getStatus(setAllStatus);
  }, []);

  return (
    <div className="post-status-main">
      <div className="user-details">
        <img src={currentUser?.imageLink} alt="imageLink" />
        <p className="name">{currentUser?.name}</p>

        <p className="headline">{currentUser?.headline}</p>
      </div>
      <div className="post-status">
        <img
          className="post-image"
          src={currentUser?.imageLink}
          alt="imageLink"
        />
        <button
          className="open-post-modal"
          onClick={() => {
            setModalOpen(true);
            setIsEdit(false);
          }}
        >
          Start a post
        </button>
      </div>
      <ModalComponent
        setStatus={setStatus}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        status={status}
        sendStatus={sendStatus}
        isEdit={isEdit}
        updateStatus={updateStatus}
        postImage={postImage}
        uploadPostImage={uploadPostImage}
        setPostImage={setPostImage}
        setCurrentPost={setCurrentPost}
        currentPost={currentPost}
      />
      <div>
        {allStatus.map((posts) => {
          return (
            <div key={posts.id}>
              <PostCard posts={posts} id={posts.id} getEditData={getEditData} />
              ;
            </div>
          );
        })}
      </div>
    </div>
  );
}
