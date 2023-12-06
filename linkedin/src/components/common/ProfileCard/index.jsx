import React, { useState, useMemo, useEffect } from "react";
import "./index.scss";
import FileUploadModal from "../fileUploadModal";
import ProfileEdit from "../ProfileEdit";
import PostCard from "../PostCard";

import { uploadImage as uploadImageApi } from "../../../api/ImageUpload";
import { HiOutlinePencil } from "react-icons/hi";
import {
  getSingleStatus,
  getSingleUser,
  getStatus,
  editProfile,
} from "../../../api/FirestoreApi";

import { useLocation } from "react-router-dom";
import usePostDetails from "../../../hooks/usePostDetails";
export default function ProfileCard({ onEdit, currentUser }) {
  let location = useLocation();
  const [currentProfile, setCurrentProfile] = useState({});
  const [allStatus, setAllStatus] = useState([]);
  const [currentImage, setCurrentImage] = useState({});
  const [imageLink, setImageLink] = useState("");
  // const [modalOpen, setModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const getImage = (event) => {
    setCurrentImage(event.target.files[0]);
  };
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
  // console.log(currentUser);
  const uploadImage = () => {
    uploadImageApi(
      currentImage,
      currentUser.id,
      setModalOpen,
      setProgress,
      setCurrentImage
    );
    setCurrentImage({});
  };

  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id);
    }

    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, []);
    // const getEditData = (posts) => {
    //   setModalOpen(true);
    //   setStatus(posts?.status);
    //   setIsEdit(true);
    //   setCurrentPost(posts);
    // };

  return (
    <>
      <FileUploadModal
        getImage={getImage}
        uploadImage={uploadImage}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentImage={currentImage}
        progress={progress}
      />

      <div className="profile-card">
        <div className="edit-btn">
          <HiOutlinePencil className="edit-icon" onClick={onEdit} />
        </div>
        <div className="profile-info">
          <div>
            <img
              onClick={() => setModalOpen(true)}
              className="profile-image"
              src={currentUser?.imageLink}
              alt="profile-image"
            />{" "}
            <h3 className="userName">
              {Object.values(currentProfile).length === 0
                ? currentUser?.name
                : currentProfile?.name}
            </h3>
            <p className="heading">
              {Object.values(currentProfile).length === 0
                ? currentUser?.headline
                : currentProfile?.headline}
            </p>
            <p className="location">
              {Object.values(currentProfile).length === 0
                ? ` ${currentUser?.city}, ${currentUser?.country}`
                : `${currentProfile?.city},${currentUser?.country}`}
            </p>
            <a
              className="website"
              target="_blank"
              href={
                Object.values(currentProfile).length === 0
                  ? currentUser?.website
                  : currentProfile?.website
              }
            >
              {Object.values(currentProfile).length === 0
                ? currentUser?.website
                : currentProfile?.website}
            </a>
          </div>
          <div className="right-info">
            <p className="college">
              {Object.values(currentProfile).length === 0
                ? currentUser?.college
                : currentProfile?.college}
            </p>
            <p className="company">
              {Object.values(currentProfile).length === 0
                ? currentUser?.company
                : currentProfile?.company}
            </p>
          </div>
        </div>
        <p className="about-me">
          {Object.values(currentProfile).length === 0
            ? currentUser?.aboutMe
            : currentProfile?.aboutMe}
        </p>
        <p className="skills">
          <span className="skill-label">Skills</span>:&nbsp;
          {Object.values(currentProfile).length === 0
            ? currentUser?.skills
            : currentProfile?.skills}
        </p>
      </div>

      <div className="post-status-main">
        {allStatus
          .filter((item) => {
            return item.userEmail === localStorage.getItem("userEmail");
          })
          .map((posts) => {
            return (
              <div key={posts.id}>
                <PostCard posts={posts} id={posts.id}  getEditData={getEditData} />;
              </div>
            );
          })}
      </div>
    </>
  );
}
