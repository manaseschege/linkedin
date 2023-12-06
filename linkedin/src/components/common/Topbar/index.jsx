import React, { useEffect, useState } from "react";
import "./index.scss";
import LinkedinLogo from "../../../assets/LinkedinLogo.png";
import user from "../../../assets/user.png";

import Popup from "../ProfilePopup";
import SearchUsers from "../SearchUsers";
import {
  AiOutlineBell,
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlineSearch,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { BsBriefcase } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../../api/FirestoreApi";
export default function Topbar({ currentUser }) {
  const [show, setShow] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  let navigate = useNavigate();
  const goRoute = (route) => {
    navigate(route);
  };
  const openUser = (user) => {
    // console.log(users);
    navigate("/profile", {
      state: {
        id: user.id,
        email: user.email,
      },
    });
  };

  const handleSearch = () => {
    if (searchInput !== "") {
      let searched = users.filter((user) => {
        return Object.values(user)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredUsers(searched);
    } else {
      setFilteredUsers(users);
    }
  };

  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 1000);
    return () => clearTimeout(debounced);
  }, [searchInput]);
  useEffect(() => {
    getAllUsers(setUsers);
  }, []);
  return (
    <div className="topbar_main">
      <img className="linked-logo" src={LinkedinLogo} alt="LinkedLogo" />

      {isSearch ? (
        <SearchUsers
          setIsSearch={setIsSearch}
          setSearchInput={setSearchInput}
        />
      ) : (
        <div className="react-icons">
          <AiOutlineSearch
            size={30}
            className="react-icon"
            onClick={() => setIsSearch(true)}
          />
          <AiOutlineHome
            onClick={() => goRoute("/home")}
            size={30}
            className="react-icon"
          />
          <AiOutlineUserAdd
            onClick={() => goRoute("/connections")}
            size={30}
            className="react-icon"
          />
          <BsBriefcase size={30} className="react-icon" />
          <AiOutlineMessage size={30} className="react-icon" />
          <AiOutlineBell size={30} className="react-icon" />
        </div>
      )}

      <img
        onClick={() => setShow(!show)}
        className="user-logo"
        src={currentUser?.imageLink}
        alt="user"
      />
     
      {show && <Popup />}
      {searchInput.length === 0 ? (
        <></>
      ) : (
        <div className="search-results">
          {filteredUsers.length === 0 ? (
            <div>No Results found...</div>
          ) : (
            filteredUsers.map((user) => (
              <div className="search-inner" onClick={() => openUser(user)}>
                <img src={user.imageLink} alt="" />
                <p className="name">{user.name}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
