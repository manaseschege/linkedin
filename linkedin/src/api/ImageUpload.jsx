import { storage } from "../firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { editProfile } from "./FirestoreApi";

export const uploadImage = (
  file,
  id,
  setModalOpen,
  setProgress,
  setCurrentImage
) => {
  const profilePicRef = ref(storage, `profileImages/${file.name}`);
  const uploadTask = uploadBytesResumable(profilePicRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress);
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((response) => {
        editProfile(id, { imageLink: response });
        setModalOpen(false);
        setCurrentImage({});
        setProgress(0);
      });
    }
  );
};
export const uploadPostImage = (file, setPostImage, setProgress) => {
  const postPicRef = ref(storage, `postImages/${file.name}`);
  const uploadTask = uploadBytesResumable(postPicRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress);
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((response) => {
        setPostImage(response);
      });
    }
  );
};
