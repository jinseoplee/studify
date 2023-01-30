import { OpenVidu } from "openvidu-browser";

import axios from "axios";
import React, { Component } from "react";
import "./App.css";
import UserVideoComponent from "./UserVideoComponent";

const APPLICATION_SERVER_URL = "http://localhost:5000/";

class App extends Component {
  constructor(props) {
    super(props);

    // These properties are in the state's component in order to re-render the HTML whenever their values change
    this.state = {
      mySessionId: "Studyroom1", //내 세션 방 이름(한글은 안먹는다. 한글을 치니 방이 안떠짐.)
      myUserName: "김싸피" + Math.floor(Math.random() * 100), //내 이름.
      session: undefined,
      mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
      publisher: undefined, //자체 로컬 웹캡 스트림이 된다.(?)
      subscribers: [], //화상 통화에서 다른 사용자의 활성 스트림을 저장합니다. => 이 배열에 참가자들을 담는 것 같다?
      isCamaraOn: false,
      isAudioOn: true,
      sessionScreen: undefined,
      screensharing: false,
    };

    this.joinSession = this.joinSession.bind(this); //세션 참가
    this.leaveSession = this.leaveSession.bind(this); //세션 나가기
    this.switchCamera = this.switchCamera.bind(this); //카메라 바꾸기
    this.myCameraToggle = this.myCameraToggle.bind(this);
    this.myAudioToggle = this.myAudioToggle.bind(this);
    this.myScreenShare = this.myScreenShare.bind(this); //화면 공유
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    //세션 방 이름 바꾸기
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    //내 이름 바꾸기
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.stopScreenShare = this.stopScreenShare.bind(this);
  }

  //??
  componentDidMount() {
    window.addEventListener("beforeunload", this.onbeforeunload);
  }

  //??
  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }

<<<<<<< HEAD
  stopScreenShare() {
    if (this.state.screensharing) {
      this.state.sessionScreen.disconnect();
      this.setState((state) => ({
        screensharing: false,
      }));
    }
=======
  myCameraOff() {
    let publisher = this.state.publisher;
    publisher.publishVideo(false);
    console.log(publisher);
    console.log(this.state.subscribers);
    console.log(this.state.mainStreamManager);
>>>>>>> d10f2420eaf08d00cf53219eb3e250b03f5a0009
  }

  myCameraToggle() {
    let publisher = this.state.publisher;
    this.setState((state) => ({
      isCamaraOn: !this.state.isCamaraOn,
    }));
    // console.log(this.state.isCamaraOn);
    publisher.publishVideo(this.state.isCamaraOn);
  }

  myAudioToggle() {
    let publisher = this.state.publisher;
    this.setState((state) => ({
      isAudioOn: !this.state.isAudioOn,
    }));
    publisher.publishAudio(this.state.isAudioOn);
  }

  //   const publisherProperties = {
  //             videoSource: videoSource,
  //             publishAudio: false,
  //             publishVideo: true,
  //             mirror: false
  //         };
  // this.openViduScreen.initPublisherAsync(undefined, publisherProperties).then(
  //             (publisher: Publisher) => {
  //                 publisher.once('accessAllowed', () => {
  //                     try {
  //                         publisher.stream.getMediaStream().getVideoTracks()[0].applyConstraints({
  //                             width: 1280,
  //                             height: 720
  //                           })
  //                     } catch (error) {
  //                         console.error(` erro na constraint =>`, publisher.stream.getMediaStream().getVideoTracks());
  //                     }

  myScreenShare() {
    var newOV = new OpenVidu();
<<<<<<< HEAD
    // var sessionScreen = newOV.initSession();
    this.setState({
      sessionScreen: newOV.initSession(),
    }),
      // console.log(this.state.sessionScreen);
      this.getToken().then((token) => {
        this.state.sessionScreen
          .connect(token)
          .then(() => {
            var publisher = newOV.initPublisher("html-element-id", {
              videoSource: "screen",
            });
            // console.log(sessionScreen);
            publisher.once("accessAllowed", () => {
              publisher.stream
                .getMediaStream()
                .getVideoTracks()[0]
                .addEventListener("ended", () => {
                  console.log('User pressed the "Stop sharing" button');
                  this.state.sessionScreen.unpublish(publisher);
                  this.setState((state) => ({
                    screensharing: false,
                  }));
                });
              this.state.sessionScreen.publish(publisher);
              this.setState((state) => ({
                screensharing: true,
              }));
            });
            // publisher.stream
            // .getMediaStream().addEventListener('inactive', () => {
            //   console.log('User pressed the "Stop sharing" button');
            //   this.state.sessionScreen.unpublish(publisher);
            //     this.setState(state => ({
            //       screensharing: false
            //     }));
            // })
            // publisher.on('videoElementCreated', (event) => {
            //   appendUserData(event.element, this.state.sessionScreen.connection);
            //   // event.element['muted'] = true;
            //   console.log('이벤트', event)
            // });

            publisher.once("accessDenied", (event) => {
              console.warn("ScreenShare: Access Denied");
            });
          })
          .catch((error) => {
            console.warn(
              "There was an error connecting to the session:",
              error.code,
              error.message
            );
          });
      });
=======
    var sessionScreen = newOV.initSession();
    this.getToken().then((token) => {
      sessionScreen
        .connect(token)
        .then(() => {
          var publisher = newOV.initPublisher("html-element-id", {
            videoSource: "screen",
          });

          publisher.once("accessAllowed", (event) => {
            publisher.stream
              .getMediaStream()
              .getVideoTracks()[0]
              .addEventListener("ended", () => {
                console.log('User pressed the "Stop sharing" button');
              });
            sessionScreen.publish(publisher);
          });

          publisher.once("accessDenied", (event) => {
            console.warn("ScreenShare: Access Denied");
          });
        })
        .catch((error) => {
          console.warn(
            "There was an error connecting to the session:",
            error.code,
            error.message
          );
        });
    });
>>>>>>> d10f2420eaf08d00cf53219eb3e250b03f5a0009
  }

  joinSession() {
    // --- 1) Get an OpenVidu object ---

    //방에 참가할때 새로운 오픈비두 객체를 생성해줍니다.
    this.OV = new OpenVidu();

    // --- 2) Init a session ---
    //세션 시작

    this.setState(
      {
        //세션을 내가 만들어준 오픈비두객체에 initSession을 사용하여 새로 만들어줍니다.
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;
        //관심 있는 세션을 구독하는 부분.
        //현재 내 세션은 위에 만든 세션이 됩니다.
        //이 부분 다시 생각해봐야할듯.

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        //streamCreated : Session 개체가 수신한 각각의 새 Stream에 대해 구독하고 반환된 구독자 개체를 subscibers 배열에 저장합니다.
        mySession.on("streamCreated", (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          // 오픈비두는 HTML 비디오를 자기 스스로 만들수가 없다.
          var subscriber = mySession.subscribe(event.stream, undefined);
          //두 번째 매개변수로 정의되지 않았으므로 OpenVidu는 자체적으로 DOM에 HTML 비디오 요소를 삽입하지 않습니다. (하위구성 요소 중에 하나에 포함된 비디오 요소를 사용합니다.) AppComponent 의 HTML템플릿은 각 구독자에 대해 UserVideoComponent를 선언하는 .map.js 함수를 포함하므로 새 비디오를 표시합니다.
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          // Update the state with the new subscribers
          //새로운 참여자들이 있도록 업데이트.
          this.setState({
            subscribers: subscribers,
          });
        });

        // On every Stream destroyed...
        mySession.on("streamDestroyed", (event) => {
          // Session 개체에서 제거된 각 Stream에 대해 (즉, 사용자가 화상 통화를 나갔다는 의미) 관련 Subscriber를 subscribers 배열에서 제거하므로 React는 자동으로 HTML에서 필요한 UserVideoComponent를 자동으로 삭제합니다. 각 Stream 개체에는 streamManager 소유한 구독자 또는 게시자를 나타내는 속성이 있습니다.
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        // 서버측에서 예기치 않은 비동기 오류가 발생할 때 Session 개체에 의해 트리거 되는 이벤트 입니다.
        mySession.on("exception", (exception) => {
          console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // Get a token from the OpenVidu deployment
        //배포된 오픈비두서버로부터 토큰을 얻어오자?
        this.getToken().then((token) => {
          //토큰 인증받기.
          //첫번째 파라미터는 오픈비두 환경으로부터 토큰을 얻어옵니다. 두번째 파라미터는 모든 유저의 이벤트로부터 검색될 수 있습니다.
          // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          //유저의 닉네임으로부터 돔은 추가될수 있다?

          mySession
            .connect(token, { clientData: this.state.myUserName })
            //연결해주는 부분같다. token을 받아오고 그 방에 있는 사람들을 비동기 통신으로 받아오는?
            .then(async () => {
              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              //구독자를 초기화하고 정의되지않은 타겟 요소들을 패스해라.(우리는 오픈비두에 비디오를 추가하길 원하지 않는다.)

              // element: we will manage it on our own) and with the desired properties
              //요소 : 우리는 우리 스스로 관리 할것이다. 원하는 요소들에 대해
              let publisher = await this.OV.initPublisherAsync(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: "200x180", // The resolution of your video //너의 비디오 크기(이 부분이 애매하다.)
                frameRate: 30, // The frame rate of your video //비율때문에 위의 크기를 바꾸어도 의미없는건가..
                insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                //반전 모드(true면 거울 그대로 false면 사진처럼)
                mirror: true, // Whether to mirror your local video or not
              });

              // --- 6) Publish your stream ---
              //너의 방송에 구독.
              mySession.publish(publisher);
              //방송에 추가시켜주는 부분이다.
              // Obtain the current video device in use
              var devices = await this.OV.getDevices();
              //장치 변수
              var videoDevices = devices.filter(
                (device) => device.kind === "videoinput"
              );
              var currentVideoDeviceId = publisher.stream
                .getMediaStream()
                .getVideoTracks()[0]
                .getSettings().deviceId;
              var currentVideoDevice = videoDevices.find(
                (device) => device.deviceId === currentVideoDeviceId
              );

              // Set the main video in the page to display our webcam and store our Publisher
              this.setState({
                currentVideoDevice: currentVideoDevice,
                mainStreamManager: publisher,
                publisher: publisher,
              });
            })
            .catch((error) => {
              console.log(
                "There was an error connecting to the session:",
                error.code,
                error.message
              );
            });
        });
      }
    );
  }

  leaveSession() {
    // 방을 나갔을때?
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = this.state.session;
    const sessionScreen = this.state.sessionScreen;

    if (mySession && sessionScreen) {
      //내 세션의 연결을 끊어줍니다.
      mySession.disconnect();
      sessionScreen.disconnect();
    }

    // Empty all properties...
    this.OV = null; //처음 Openvidu객체를 null로 바꾸어줍니다.
    this.setState({
      session: undefined, //세션없애고
      subscribers: [], //구독자 배열 다시 빈 배열로 만들어주고
      mySessionId: "Studyroom1", //SessionA를 기본이름.
      myUserName: "김싸피" + Math.floor(Math.random() * 100),
      mainStreamManager: undefined, //이게 뭐자?
      publisher: undefined,
    });
  }

  async switchCamera() {
    //카메라 바꿔주는 부분인데
    //내 디바이스에서 카메라가 여러개있는 경우에 사용하는 것 같은데?
    //딱히 필요없을것같다.
    try {
      const devices = await this.OV.getDevices();
      var videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== this.state.currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = this.OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          //newPublisher.once("accessAllowed", () => {
          await this.state.session.unpublish(this.state.mainStreamManager);

          await this.state.session.publish(newPublisher);
          this.setState({
            currentVideoDevice: newVideoDevice[0],
            mainStreamManager: newPublisher,
            publisher: newPublisher,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;

    return (
      <div className="container">
        {this.state.session === undefined ? (
          <div id="join">
            <div id="join-dialog" className="jumbotron vertical-center">
              <h1> 스터디룸 참가 </h1>
              <form className="form-group" onSubmit={this.joinSession}>
                <p>
                  <label>Participant: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="userName"
                    value={myUserName}
                    onChange={this.handleChangeUserName}
                    required
                  />
                </p>
                <p>
                  <label> Session: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="sessionId"
                    value={mySessionId}
                    onChange={this.handleChangeSessionId}
                    required
                  />
                </p>
                <p className="text-center">
                  <input
                    className="btn btn-lg btn-success"
                    name="commit"
                    type="submit"
                    value="JOIN"
                  />
                </p>
              </form>
            </div>
          </div>
        ) : null}

        {this.state.session !== undefined ? (
          <div id="session">
            <div className="userScreen">
              <div className="sidebar">
                {this.state.mainStreamManager !== undefined ? (
                  <div id="main-video" className="col-md-6">
                    <h1 id="session-title">{mySessionId}</h1>
                    <UserVideoComponent
                      streamManager={this.state.mainStreamManager}
                    />
                    <h3>{myUserName}</h3>

                    <input
                      className="btn btn-large btn-success"
                      type="button"
                      id="MyCameraToggle"
                      onClick={this.myCameraToggle}
                      value="화면 켜기/끄기"
                    />
                    <br />
                    <input
                      className="btn btn-large btn-success"
                      type="button"
                      id="MyAudioToggle"
                      onClick={this.myAudioToggle}
                      value="마이크 켜기/끄기"
                    />
                    <br />
                    <input
                      className="btn btn-large btn-success"
                      type="button"
                      id="shareMyScreen"
                      onClick={this.myScreenShare}
                      value="화면공유하기"
                      disabled={this.state.screensharing}
                    />
                    <input
                      className="btn btn-large btn-success"
                      type="button"
                      id="stopScreenShare"
                      onClick={this.stopScreenShare}
                      value="화면공유 중지"
                    />
                    <input
                      className="btn btn-large btn-danger"
                      type="button"
                      id="buttonLeaveSession"
                      onClick={this.leaveSession}
                      value="방 나가기"
                    />
                  </div>
                ) : null}
              </div>
            </div>
            <div className="contents">
              <div id="video-container" className="col-md-6">
                {this.state.subscribers.map((sub, i) => (
                  <div key={i} className="stream-container col-md-6 col-xs-6">
                    <UserVideoComponent streamManager={sub} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */
  async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
  }

  async createSession(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The sessionId
  }

  async createToken(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
  }
}

export default App;
