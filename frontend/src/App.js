import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import MainPage from "./pages/MainPage/MainPage";
import RootLayout from "./pages/MainPage/RootLayout";
import Signup, { action as newSignupAction } from "./pages/Signup/Signup";
import UserSignup from "./Components/Signup/UserSignup";
import ResetPw from "./pages/Login/ResetPw";
import DashBoard from "./pages/DashBoard/DashBoard";
import StudyMake from "./Components/DashBoard/StudyMake";
import StudyDetails from "./pages/MainStudy/StudyDetails";
import StudyInfo from "./Components/MainStudy/StudyInfo";
import StudyRule from "./Components/MainStudy/StudyRule";
import StudyHistory from "./Components/MainStudy/StudyHistory";
import StudyMember from "./Components/MainStudy/StudyMember";
import StudyUpdate from "./Components/MainStudy/StudyUpdate";
import StudyRoungeMain from "./pages/StudyRounge/StudyRounge";
import ChartTest from "./Components/UI/ChartTest";
import ProfilePage from "./pages/Profile/ProfileMain";
import VideoRoomComponent from "./Openvidu/components/VideoRoomComponent";
import Ranking from "./pages/Rank/Ranking";
import RankAll from "./Components/Rank/RankAll";
import RankGenerations from "./Components/Rank/RankGenerations";
import ProfileEdit from "./Components/Profile/ProfileEdit";
import StudyExplain from "./pages/StudyRounge/StudyExplain";

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
        path: "/user/login",
        element: <LoginPage />,
      },
      {
        path: "/user/resetpw",
        element: <ResetPw />,
      },
      {
        path: "/mainpage",
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
      {
        path: "/study/explain",
        element: <StudyExplain />,
      },
      // 중첩라우팅
      {
        path: "/study/:studyId",
        element: <StudyDetails />,
        children: [
          { index: true, element: <StudyInfo /> },
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
          { index: true, element: <RankAll /> },
          { path: "all", element: <RankAll /> },
          { path: "generations", element: <RankGenerations /> },
        ],
      },
      { path: "/userprofile", element: <ProfilePage /> },
      { path: "/userprofile/edit", element: <ProfileEdit /> },
      { path: "/study/:studyId/update", element: <StudyUpdate /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
