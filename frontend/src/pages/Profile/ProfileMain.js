import React from "react";
import ProfileMain from "../../Components/Profile/ProfileMain";
import Topbar from "../../Components/Topbar/Topbar";
import ProfileImg from "../../Components/Profile/ProfileImg";
import TokenCheck from "../../Components/TokenCheck/TokenCheck";

const ProfilePage = () => {
  return (
    <>
      <TokenCheck />
      <Topbar />
      <ProfileImg />
      <ProfileMain />
    </>
  );
};

export default ProfilePage;
