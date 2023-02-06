import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginId from "./pages/Login/LoginId";
import LoginPw from "./pages/Login/LoginPw";
import MainPage from "./pages/MainPage/MainPage";
import RootLayout from "./pages/MainPage/RootLayout";
import Signup, { action as newSignupAction } from "./pages/Signup/Signup";
import UserSignup from "./Components/Signup/UserSignup";
import ResetPw from "./pages/Login/ResetPw";
import DashBoard from "./pages/DashBoard/DashBoard";
//이 아래로 컴포넌트로 이동?.. 이것도 페이지 이동으로 바꿔야할거 같은데..
import StudyMake from "./Components/DashBoard/StudyMake";
import StudyDetails from "./pages/MainStudy/StudyDetails";
import StudyInfo from "./Components/MainStudy/StudyInfo";
import StudyRule from "./Components/MainStudy/StudyRule";
import StudyHistory from "./Components/MainStudy/StudyHistory";
import StudyMember from "./Components/MainStudy/StudyMember";
import StudyRoungeMain from "./Components/StudyRounge/StudyRoungeMain";
import ChartTest from "./Components/UI/ChartTest";
import VideoRoomComponent from "./Openvidu/components/VideoRoomComponent";
import Ranking from "./pages/Rank/Ranking";
import RankAll from "./Components/Rank/RankAll"
import RankStudy from "./Components/Rank/RankStudy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <MainPage /> }, //처음 index를 true로 만듦으로 써 <RootLayout>이 요청되었을때 MainPage가 나오게 만들었습니다.
      {
        path: "/user/signup",
        element: <Signup />,
        action: { newSignupAction },
        errorElement: <p>잘못된 정보입니다.</p>,
      },
      {
        path: "/user/signup/:codeId",
        element: <UserSignup />,
      },
      {
        path: "/user/login/id",
        element: <LoginId />,
      },
      {
        path: "/user/login/pw",
        element: <LoginPw />,
      },
      {
        path: "/user/resetpw",
        element: <ResetPw />,
      },
      {
        path: "/dashboard",
        element: <DashBoard />,
      },
      {
        path: "/study/rounge",
        element: <StudyRoungeMain />,
      },
      {
        path: "/study/newstudy",
        element: <StudyMake />,
      },
      // 중첩라우팅
      {
        path: "/study/:studyId",
        element: <StudyDetails />,
        children: [
          { path: "info", element: <StudyInfo /> },
          { path: "rule", element: <StudyRule /> },
          { path: "record", element: <StudyHistory /> },
          { path: "member", element: <StudyMember /> },
        ],
      },
      { path: "/chart", element: <ChartTest /> },
      { path: "/videoroom", element: <VideoRoomComponent /> },
      {
        path: "/ranking",
        element: <Ranking />,
        children: [
          { path: "all", element: <RankAll /> },
          { path: "study", element: <RankStudy /> },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
