import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginId from "./pages/LoginId";
import LoginPw from "./pages/LoginPw";
import MainPage from "./pages/MainPage";
import RootLayout from "./pages/RootLayout";
import Signup, { action as newSignupAction } from "./pages/Signup";
import UserSignup from "./Components/Signup/UserSignup";
import ResetPw from "./pages/ResetPw";
import DashBoard from "./pages/DashBoard";

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
