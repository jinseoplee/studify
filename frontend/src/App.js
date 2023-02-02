import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginId from "./pages/LoginId";
import LoginPw from "./pages/LoginPw";
import MainPage from "./pages/MainPage";
import RootLayout from "./pages/RootLayout";
import Signup, { action as newSignupAction } from "./pages/Signup";
import UserSignup from "./Components/Signup/UserSignup";
import ResetPw from "./pages/ResetPw";
import DashBoard from "./pages/DashBoard";
import StudyMake from "./Components/DashBoard/StudyMake";
import StudyDetail from "./Components/MainStudy/StudyDetail";
import StudyInfo from "./Components/MainStudy/StudyInfo";
import StudyRule from "./Components/MainStudy/StudyRule";
import StudyHistory from "./Components/MainStudy/StudyHistory";
import StudyMember from "./Components/MainStudy/StudyMember";
import StudyRoungeMain from "./Components/StudyRounge/StudyRoungeMain";
import ChartTest from "./Components/UI/ChartTest";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <MainPage /> },
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
        element: <StudyDetail />,
        children: [
          { path: "info", element: <StudyInfo /> },
          { path: "rule", element: <StudyRule /> },
          { path: "record", element: <StudyHistory /> },
          { path: "member", element: <StudyMember /> },
        ],
      },
      { path: "/chart", element: <ChartTest /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
// createRoutesFromElements(
//   <Route path="/" element={<RootLayout />}>
//     <Route index element={<StartPage />} />
//     <Route
//       path="/user/signup"
//       element={<Signup />}
//       action={newSignupAction}
//       errorElement={<p>잘못된 정보를 입력하셨습니다.</p>}
//     />
//   </Route>
// )
