import React, { Component } from "react";
import "./SidebarComponent.css";

import Mic from "@material-ui/icons/Mic";
import MicOff from "@material-ui/icons/MicOff";
import Videocam from "@material-ui/icons/Videocam";
import VideocamOff from "@material-ui/icons/VideocamOff";
import Fullscreen from "@material-ui/icons/Fullscreen";
import FullscreenExit from "@material-ui/icons/FullscreenExit";
import PictureInPicture from "@material-ui/icons/PictureInPicture";
import ScreenShare from "@material-ui/icons/ScreenShare";
import StopScreenShare from "@material-ui/icons/StopScreenShare";
import Tooltip from "@material-ui/core/Tooltip";
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";
import QuestionAnswer from "@material-ui/icons/QuestionAnswer";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import {
  ListItemText,
  ListItemIcon,
  MenuItem,
  MenuList,
} from "@material-ui/core";

export default class SidebarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { fullscreen: false, isBlackBoard: false };
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.screenShare = this.screenShare.bind(this);
    this.stopScreenShare = this.stopScreenShare.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.toggleIsBlackBoard = this.toggleIsBlackBoard.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
  }

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

  toggleFullscreen() {
    this.setState({ fullscreen: !this.state.fullscreen });
    this.props.toggleFullscreen();
    // console.log(this.state.fullscreen)
  }

  toggleIsBlackBoard() {
    this.setState({ isBlackBoard: !this.state.isBlackBoard });
    this.props.toggleIsBlackBoard();
  }

  leaveSession() {
    this.props.leaveSession();
  }

  toggleChat() {
    this.props.toggleChat();
  }

  render() {
    const localUser = this.props.user;
    return (
      // <AppBar className="toolbar" id="header">
      <MenuList className="side">
        <MenuItem>
          <ListItemIcon
            color="inherit"
            // className="navButton"
            id="navMicButton"
            onClick={this.micStatusChanged}
          >
            {localUser !== undefined && localUser.isAudioActive() ? (
              <Mic />
            ) : (
              <MicOff color="secondary" />
            )}
          </ListItemIcon>
          <ListItemText
            color="inherit"
            // className="navButton"
            id="navMicButton"
            onClick={this.micStatusChanged}
          >
            {localUser !== undefined && localUser.isAudioActive()
              ? "마이크 끄기"
              : "마이크 켜기"}
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon
            color="inherit"
            // className="navButton"
            id="navCamButton"
            onClick={this.camStatusChanged}
          >
            {localUser !== undefined && localUser.isVideoActive() ? (
              <Videocam />
            ) : (
              <VideocamOff color="secondary" />
            )}
          </ListItemIcon>
          <ListItemText
            color="inherit"
            // className="navButton"
            id="navCamButton"
            onClick={this.camStatusChanged}
          >
            {localUser !== undefined && localUser.isVideoActive()
              ? "카메라 끄기"
              : "카메라 켜기"}
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon
            color="inherit"
            // className="navButton"
            id="navScreenButton"
            onClick={this.screenShare}
          >
            {localUser !== undefined && localUser.isScreenShareActive() ? (
              <PictureInPicture />
            ) : (
              <ScreenShare />
            )}
          </ListItemIcon>
          <ListItemText
            color="inherit"
            // className="navButton"
            id="navScreenButton"
            onClick={this.screenShare}
          >
            {localUser !== undefined && localUser.isScreenShareActive()
              ? "창 변경하기"
              : "화면 공유"}
          </ListItemText>
        </MenuItem>
        {localUser !== undefined && localUser.isScreenShareActive() && (
          <MenuItem>
            <ListItemIcon onClick={this.stopScreenShare} id="navScreenButton">
              <StopScreenShare color="secondary" />
            </ListItemIcon>
            <ListItemText onClick={this.stopScreenShare} id="navScreenButton">
              화면 공유 중지
            </ListItemText>
          </MenuItem>
        )}
        <MenuItem>
          <ListItemIcon
            color="inherit"
            // className="navButton"
            onClick={this.toggleIsBlackBoard}
          >
            {localUser !== undefined && this.state.isBlackBoard ? (
              <HighlightOffIcon />
            ) : (
              <BorderColorIcon />
            )}
          </ListItemIcon>
          <ListItemText
            color="inherit"
            // className="navButton"
            onClick={this.toggleIsBlackBoard}
          >
            {localUser !== undefined && this.state.isBlackBoard
              ? "칠판 끄기"
              : "칠판 키기"}
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon
            color="inherit"
            // className="navButton"
            onClick={this.toggleFullscreen}
          >
            {localUser !== undefined && this.state.fullscreen ? (
              <FullscreenExit />
            ) : (
              <Fullscreen />
            )}
          </ListItemIcon>
          <ListItemText
            color="inherit"
            // className="navButton"
            onClick={this.toggleFullscreen}
          >
            {localUser !== undefined && this.state.fullscreen
              ? "전체 화면 종료"
              : "전체 화면"}
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon
            color="inherit"
            // className="navButton"
            onClick={this.toggleChat}
            // id="navChatButton"
          >
            {this.props.showNotification && <div id="point" className="" />}
            <Tooltip title="Chat">
              <QuestionAnswer />
            </Tooltip>
          </ListItemIcon>
          <ListItemText
            color="inherit"
            // className="navButton"
            onClick={this.toggleChat}
            // id="navChatButton"
          >
            채팅하기
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon
            color="secondary"
            // className="navButton"
            onClick={this.leaveSession}
            // id="navLeaveButton"
          >
            <PowerSettingsNew />
          </ListItemIcon>
          <ListItemText
            color="secondary"
            // className="navButton"
            onClick={this.leaveSession}
            // id="navLeaveButton"
          >
            종료하기
          </ListItemText>
        </MenuItem>
      </MenuList>
    );
  }
}
