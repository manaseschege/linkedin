import React, { useState } from 'react'
const usePostDetails = () => {
     const [modalOpen, setModalOpen] = useState(false);
     const [status, setStatus] = useState("");
     const [isEdit, setIsEdit] = useState(false);
     const [currentPost, setCurrentPost] = useState({});
     const getEditData = (posts) => {
       setModalOpen(true);
       setStatus(posts?.status);
       setIsEdit(true);
       setCurrentPost(posts);
     };
  return {
    getEditData,modalOpen,status,isEdit,currentPost,setCurrentPost,setIsEdit,setModalOpen,setStatus
  }
}


export default usePostDetails;
