import React, { Component } from "react";
import "../../../Style/Openvidu/SidebarComponent.css";
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
import newshare from "../../../assets/image/videoroom/newshare.png"

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
            <img src={micoff} alt="micoff" />
          ) : (
            <img src={micon} alt="micon" />
          )}
        </div>
        <div onClick={this.camStatusChanged}>
          {localUser !== undefined && localUser.isVideoActive() ? (
            <img src={camoff} alt="camoff" />
          ) : (
            <img src={camon} alt="camon" />
          )}
        </div>
        <div onClick={this.screenShare}>
          {localUser !== undefined && localUser.isScreenShareActive() ? (
            <img src={newshare} alt="newshare" />
          ) : (
            <img src={shareon} alt="shareon" />
          )}
        </div>
        {localUser !== undefined && localUser.isScreenShareActive() && (
          <div onClick={this.stopScreenShare}>
            <img src={shareoff} alt="shareoff" />
          </div>
        )}
        <div onClick={this.handleFullScreen}>
          {localUser !== undefined && isFull ? (
            <img src={fulloff} alt="fulloff" />
          ) : (
            <img src={fullon} alt="fullon" />
          )}
        </div>
        <div onClick={this.toggleIsBlackBoard}>
          {localUser !== undefined && this.state.isBlackBoard ? (
            <img src={paintoff} alt="paintoff" />
          ) : (
            <img src={painton} alt="painton" />
          )}
        </div>
        <div onClick={this.toggleEditor}>
          {localUser !== undefined && editorDisplay === "none" ? (
            <img src={mdon} alt="mdon" />
          ) : (
            <img src={mdoff} alt="mdoff" />
          )}
        </div>
        <div onClick={this.toggleChat}>
          {this.props.showNotification && <div id="point" className="" />}
          <img src={chaton} alt="chaton" />
        </div>
        <div onClick={this.leaveSession}>
          <img src={off} alt="off" />
        </div>
      </div>
    );
  }
}
