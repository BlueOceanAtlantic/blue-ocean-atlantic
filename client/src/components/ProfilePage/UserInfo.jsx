import React from "react";
import EditUserInfo from "./EditUserInfo";
import HandyIcon from "../HandyIcon";

const UserInfo = (props) => {
  const {
    name,
    photo,
    zip,
    handy,
    password,
    email,
    showEditUserForm,
    toggleEditUserForm,
    user_id,
  } = props;
  return (
    <div className="profile-card">
      <img className="avatar" src={photo} alt="profile_photo" />
      <div>
        <span>
          {name}
          <HandyIcon score={handy} />
        </span>
      </div>
      <div>{`Handy Score: ${handy}`}</div>
      <div>{`ZIP Code: ${zip}`}</div>
      <div>{email}</div>
      {!showEditUserForm && (
        <button className="edit-user-info-button" onClick={toggleEditUserForm}>
          Edit Profile
        </button>
      )}
      {showEditUserForm && (
        <EditUserInfo
          name={name}
          zip={zip}
          photo={photo}
          email={email}
          password={password}
          toggleEditUserForm={toggleEditUserForm}
          user_id={user_id}
        />
      )}
    </div>
  );
};

export default UserInfo;
