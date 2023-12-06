import { Button, Modal, Progress } from "antd";
import "./index.scss";
import ReactQuill from "react-quill";
import { AiOutlinePicture } from "react-icons/ai";
import { useState } from "react";
const ModalComponent = ({
  modalOpen,
  sendStatus,
  status,
  setStatus,
  setModalOpen,
  isEdit,
  updateStatus,
  uploadPostImage,
  setPostImage,
  postImage,
  currentPost,
  setCurrentPost,
}) => {

  const [progress, setProgress] = useState(0);
  return (
    <>
      <Modal
        title="Create a post"
        centered
        open={modalOpen}
        onOk={() => {
          setStatus("");
          setModalOpen(false);
          setPostImage("");
          setCurrentPost({});
        }}
        onCancel={() => {
          setStatus("");
          setModalOpen(false);
          setPostImage("");
          setCurrentPost({});
        }}
        footer={[
          <Button
            onClick={isEdit ? updateStatus : sendStatus}
            key="submit"
            type="primary"
            disabled={status.length > 0 ? false : true}
          >
            {isEdit ? "update" : "Post"}
          </Button>,
        ]}
      >
        <div className="posts-body">
          <ReactQuill
            className="modal-input"
            theme="snow"
            value={status}
            placeholder="Share Something..."
            onChange={setStatus}
          />
          ;
          {progress === 0 || progress === 100 ? (
            <></>
          ) : (
            <div className="progress-bar">
              {" "}
              <Progress type="circle" percent={progress} />
            </div>
          )}
          {postImage?.length > 0 || currentPost?.postImage?.length ? (
            <img
              className="preview-image"
              src={postImage || currentPost?.postImage}
              alt="postImage"
            />
          ) : (
            <></>
          )}
          <label htmlFor="pic-upload">
            <AiOutlinePicture size={35} className="picture-icon" />
          </label>
          <input
            id="pic-upload"
            type="file"
            hidden
            onChange={(e) =>
              uploadPostImage(e.target.files[0], setPostImage, setProgress)
            }
          />
        </div>
      </Modal>
    </>
  );
};
export default ModalComponent;
