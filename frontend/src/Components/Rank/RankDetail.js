import { Outlet } from "react-router-dom";
import RankSwitchbar from "./RankSwitchbar";

const RankDetail = () => {
  return (
    <>
      <div>
        <div>
          <RankSwitchbar />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default RankDetail;
