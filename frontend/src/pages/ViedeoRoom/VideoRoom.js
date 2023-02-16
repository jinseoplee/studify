import React from "react";
import VideoRoomComponent from "../../Openvidu/components/VideoRoomComponent";
import UserCheck from "../../Components/TokenCheck/UserCheck";

const VideoRoom = () => {
  return (
    <>
      <UserCheck />
      <VideoRoomComponent />
    </>
  );
};

export default VideoRoom;
