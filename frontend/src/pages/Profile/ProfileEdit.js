import React from "react";
import Topbar from "../../Components/Topbar/Topbar";
import TokenCheck from "../../Components/TokenCheck/TokenCheck";
import ProfileEdit from "../../Components/Profile/ProfileEdit";

const ProfilePage = () => {
  return (
    <>
      <TokenCheck />
      <Topbar />
      <ProfileEdit />
    </>
  );
};

export default ProfilePage;
