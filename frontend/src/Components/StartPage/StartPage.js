import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Footer from "../Footer/Footer";
import OpenStudy from "../OpenStudy/OpenStudy";
import Topbar from "../Topbar/Topbar";
import Rank from "../Rank/Rank";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <>
          <Topbar /> <Outlet />
          <Footer />
        </>
      }
    >
      <Route index element={<></>}></Route>
      <Route path="/openstudy" element={<OpenStudy />}></Route>
      <Route path="/rank" element={<Rank />}></Route>
    </Route>
  )
);

const StartPage = () => {
  return (
    <React.Fragment>
      {/* <Topbar /> */}
      <RouterProvider router={router} />
      {/* <Footer /> */}
    </React.Fragment>
  );
};

export default StartPage;
