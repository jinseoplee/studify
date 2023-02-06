import { Link } from "react-router-dom";

const RankSwitchbar = () => {
  return (
    <div>
      <Link to="all">
        전체
      </Link>
      <Link to="study">
        스터디
      </Link>
    </div>
  );
};

export default RankSwitchbar;