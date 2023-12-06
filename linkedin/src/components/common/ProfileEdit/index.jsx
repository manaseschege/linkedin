import React, { useState } from "react";
import "./index.scss";
import { editProfile } from "../../../api/FirestoreApi";
import { AiOutlineClose } from "react-icons/ai";
export default function ProfileEdit({ onEdit, currentUser }) {
  const [editInputs, setEditInputs] = useState(currentUser);

  const getInput = (event) => {
    let { name, value } = event.target;

    let input = { [name]: value };

    console.log(editInputs);
    setEditInputs({ ...editInputs, ...input });
  };
  const updateProfileDate = async () => {
    await editProfile(currentUser?.id, editInputs);
    await onEdit();
  };

  return (
    <div className="profile-card">
      <div className="edit-btn">
        <AiOutlineClose className="close-icon" onClick={onEdit} size={25} />
      </div>
      <div className="profile-edit-inputs">
        <label>Name</label>
        <input
          onChange={getInput}
          className="common-input"
          name="name"
          value={editInputs.name}
          placeholder="Name"
        />
        <label>Headline</label>
        <input
          onChange={getInput}
          className="common-input"
          name="headline"
          value={editInputs.headline}
          placeholder="Headline"
        />
        <label>Country</label>
        <input
          onChange={getInput}
          className="common-input"
          name="country"
          value={editInputs.country}
          placeholder="Country"
        />
        <label>City</label>
        <input
          onChange={getInput}
          className="common-input"
          name="city"
          value={editInputs.city}
          placeholder="City"
        />
        <label>Company</label>
        <input
          onChange={getInput}
          className="common-input"
          name="company"
          value={editInputs.company}
          placeholder="company"
        />
        <label>Industry</label>
        <input
          onChange={getInput}
          className="common-input"
          name="industry"
          value={editInputs.industry}
          placeholder="Industry"
        />

        <label>College</label>
        <input
          onChange={getInput}
          className="common-input"
          name="college"
          value={editInputs.college}
          placeholder="college"
        />

        <label>Website</label>
        <input
          onChange={getInput}
          className="common-input"
          name="website"
          value={editInputs.website}
          placeholder="Website"
        />
        <label>About</label>
        <textarea
          placeholder="About Me"
          className="common-textArea"
          onChange={getInput}
          rows={5}
          name="aboutMe"
          value={editInputs.aboutMe}
        />
        <label>Skills</label>
        <input
          onChange={getInput}
          className="common-input"
          name="skills"
          value={editInputs.skills}
          placeholder="Skills"
        />
      </div>
      <div className="save-container">
        <button onClick={updateProfileDate} className="save-btn">
          Save
        </button>
      </div>
    </div>
  );
}
