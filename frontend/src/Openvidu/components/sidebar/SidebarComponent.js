import React, { Component } from "react";
import "../../../Style/Openvidu/SidebarComponent.css";

// import Mic from "@material-ui/icons/Mic";
// import MicOff from "@material-ui/icons/MicOff";
// import Videocam from "@material-ui/icons/Videocam";
// import VideocamOff from "@material-ui/icons/VideocamOff";
// import Fullscreen from "@material-ui/icons/Fullscreen";
// import FullscreenExit from "@material-ui/icons/FullscreenExit";
// import PictureInPicture from "@material-ui/icons/PictureInPicture";
// import ScreenShare from "@material-ui/icons/ScreenShare";
// import StopScreenShare from "@material-ui/icons/StopScreenShare";
// import Tooltip from "@material-ui/core/Tooltip";
// import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";
// import QuestionAnswer from "@material-ui/icons/QuestionAnswer";
// import CreateIcon from "@material-ui/icons/Create";
// import BorderColorIcon from "@material-ui/icons/BorderColor";
// import HighlightOffIcon from "@material-ui/icons/HighlightOff";
// import {
//   ListItemText,
//   ListItemIcon,
//   MenuItem,
//   MenuList,
// } from "@material-ui/core";
import camoff from "../../../assets/image/videoroom/camoff.png";
import camon from "../../../assets/image/videoroom/camon.png";
import chatoff from "../../../assets/image/videoroom/chatoff.png";
import chaton from "../../../assets/image/videoroom/chaton.png";
import fulloff from "../../../assets/image/videoroom/fulloff.png";
import fullon from "../../../assets/image/videoroom/fullon.png";
import mdoff from "../../../assets/image/videoroom/mdoff.png";
import mdon from "../../../assets/image/videoroom/mdon.png";
import micoff from "../../../assets/image/videoroom/micoff.png";
import micon from "../../../assets/image/videoroom/micon.png";
import off from "../../../assets/image/videoroom/off.png";
import paintoff from "../../../assets/image/videoroom/paintoff.png";
import painton from "../../../assets/image/videoroom/painton.png";
import shareoff from "../../../assets/image/videoroom/shareoff.png";
import shareon from "../../../assets/image/videoroom/shareon.png";

export default class SidebarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { isFull: false, isBlackBoard: false };
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.screenShare = this.screenShare.bind(this);
    this.stopScreenShare = this.stopScreenShare.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
    this.toggleEditor = this.toggleEditor.bind(this);
    this.toggleIsBlackBoard = this.toggleIsBlackBoard.bind(this);
  }

  handleFullScreen = (e) => {
    const { isFull } = this.state;
    this.setState({
      isFull: !isFull,
    });
    if (!isFull) {
      this.openFullscreen();
    } else {
      this.setState({ isFull: false });
      this.closeFullScreen();
    }
  };

  openFullscreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullScreen();
    }
  };

  closeFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancleFullScreen) {
      document.mozCancleFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  componentDidMount = () => {
    window.addEventListener("fullscreenchange", (e) => {
      this.setState({ isFull: document.fullscreen });
    });
  };

  micStatusChanged() {
    this.props.micStatusChanged();
  }

  camStatusChanged() {
    this.props.camStatusChanged();
  }

  screenShare() {
    this.props.screenShare();
  }

  stopScreenShare() {
    this.props.stopScreenShare();
  }

  leaveSession() {
    this.props.leaveSession();
  }

  toggleChat() {
    this.props.toggleChat();
  }

  toggleEditor() {
    this.props.toggleEditor();
  }

  toggleIsBlackBoard() {
    this.setState({ isBlackBoard: !this.state.isBlackBoard });
    this.props.toggleIsBlackBoard();
  }

  render() {
    const localUser = this.props.user;
    const { isFull } = this.state;
    const editorDisplay = this.props.editorDisplay.display;
    return (
      <div className="side">
        <div onClick={this.micStatusChanged}>
          {localUser !== undefined && localUser.isAudioActive() ? (
            <img src={micon} />
          ) : (
            <img src={micoff} />
          )}
        </div>
        <div onClick={this.camStatusChanged}>
          {localUser !== undefined && localUser.isVideoActive() ? (
            <img src={camon} />
          ) : (
            <img src={camoff} />
          )}
        </div>
        <div onClick={this.screenShare}>
          {localUser !== undefined && localUser.isScreenShareActive() ? (
            <img src={shareoff} />
          ) : (
            <img src={shareon} />
          )}
        </div>
        {localUser !== undefined && localUser.isScreenShareActive() && (
          <div onClick={this.stopScreenShare}>
            <img src={shareoff} />
          </div>
        )}
        <div onClick={this.handleFullScreen}>
          {localUser !== undefined && isFull ? (
            <img src={fulloff} />
          ) : (
            <img src={fullon} />
          )}
        </div>
        <div onClick={this.toggleIsBlackBoard}>
          {localUser !== undefined && this.state.isBlackBoard ? (
            <img src={paintoff} />
          ) : (
            <img src={painton} />
          )}
        </div>
        <div onClick={this.toggleEditor}>
          {localUser !== undefined && editorDisplay === "none" ? (
            <img src={mdoff} />
          ) : (
            <img src={mdon} />
          )}
        </div>
        <div onClick={this.toggleChat}>
            {this.props.showNotification && <div id="point" className="" />}
            <img src={chaton} />
        </div>
           <div onClick={this.leaveSession}>
             <img src={off} />
         </div>
      </div>
      // <MenuList className="side">
      //   <MenuItem onClick={this.micStatusChanged}>
      //     <ListItemIcon
      //       id="navMicButton"
      //     >
      //       {localUser !== undefined && localUser.isAudioActive() ? (
      //         <Mic />
      //       ) : (
      //         <MicOff color="secondary" />
      //       )}
      //     </ListItemIcon>
      //     <ListItemText
      //       id="navMicButton"
      //     >
      //       {localUser !== undefined && localUser.isAudioActive()
      //         ? "마이크 끄기"
      //         : "마이크 켜기"}
      //     </ListItemText>
      //   </MenuItem>
      //   <MenuItem onClick={this.camStatusChanged}>
      //     <ListItemIcon
      //       color="inherit"
      //       id="navCamButton"
      //     >
      //       {localUser !== undefined && localUser.isVideoActive() ? (
      //         <Videocam />
      //       ) : (
      //         <VideocamOff color="secondary" />
      //       )}
      //     </ListItemIcon>
      //     <ListItemText
      //       color="inherit"
      //       id="navCamButton"
      //     >
      //       {localUser !== undefined && localUser.isVideoActive()
      //         ? "카메라 끄기"
      //         : "카메라 켜기"}
      //     </ListItemText>
      //   </MenuItem>
      // <MenuItem onClick={this.screenShare}>
      //   <ListItemIcon
      //     color="inherit"
      //     id="navScreenButton"
      //   >
      //     {localUser !== undefined && localUser.isScreenShareActive() ? (
      //       <PictureInPicture />
      //     ) : (
      //       <ScreenShare />
      //     )}
      //   </ListItemIcon>
      //   <ListItemText
      //     color="inherit"
      //     id="navScreenButton"
      //   >
      //     {localUser !== undefined && localUser.isScreenShareActive()
      //       ? "창 변경하기"
      //       : "화면 공유"}
      //   </ListItemText>
      // </MenuItem>
      // {localUser !== undefined && localUser.isScreenShareActive() && (
      //   <MenuItem onClick={this.stopScreenShare}>
      //     <ListItemIcon id="navScreenButton">
      //       <StopScreenShare color="secondary" />
      //     </ListItemIcon>
      //     <ListItemText id="navScreenButton">화면 공유 중지</ListItemText>
      //   </MenuItem>
      // )}
      // <MenuItem onClick={this.handleFullScreen}>
      //   <ListItemIcon
      //     color="inherit"
      //   >
      //     {localUser !== undefined && isFull ? (
      //       <FullscreenExit />
      //     ) : (
      //       <Fullscreen />
      //     )}
      //   </ListItemIcon>
      //   <ListItemText
      //     color="inherit"
      //   >
      //     {localUser !== undefined && isFull ? "전체 화면 종료" : "전체 화면"}
      //   </ListItemText>
      // </MenuItem>
      // <MenuItem onClick={this.toggleIsBlackBoard}>
      //   <ListItemIcon
      //     color="inherit"
      //   >
      //     {localUser !== undefined && this.state.isBlackBoard ? (
      //       <HighlightOffIcon />
      //     ) : (
      //       <BorderColorIcon />
      //     )}
      //   </ListItemIcon>
      //   <ListItemText
      //     color="inherit"
      //   >
      //     {localUser !== undefined && this.state.isBlackBoard
      //       ? "칠판 끄기"
      //       : "칠판 키기"}
      //   </ListItemText>
      // </MenuItem>
      // <MenuItem onClick={this.toggleEditor}>
      //   <ListItemIcon color="inherit" id="navEditorButton">
      //     {localUser !== undefined && editorDisplay === "none" ? (
      //       <CreateIcon />
      //     ) : (
      //       <CreateIcon color="secondary" />
      //     )}
      //   </ListItemIcon>
      //   <ListItemText color="inherit" id="navEditorButton">
      //     {localUser !== undefined && editorDisplay === "none"
      //       ? "편집기 열기"
      //       : "편집기 끄기"}
      //   </ListItemText>
      // </MenuItem>
      //   <MenuItem onClick={this.toggleChat}>
      //     <ListItemIcon
      //       color="inherit"
      //     >
      //       {this.props.showNotification && <div id="point" className="" />}
      //       <Tooltip title="Chat">
      //         <QuestionAnswer />
      //       </Tooltip>
      //     </ListItemIcon>
      //     <ListItemText
      //       color="inherit"
      //     >
      //       채팅하기
      //     </ListItemText>
      //   </MenuItem>
        // <MenuItem onClick={this.leaveSession}>
        //   <ListItemIcon
        //     color="secondary"
        //   >
        //     <PowerSettingsNew />
        //   </ListItemIcon>
        //   <ListItemText
        //     color="secondary"
        //   >
        //     종료하기
        //   </ListItemText>
        // </MenuItem>
      // </MenuList>
    );
  }
}
