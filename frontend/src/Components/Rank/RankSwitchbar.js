import { Link } from "react-router-dom";
import RankStyle from "../../Style/Rank/Rank.module.css"

const RankSwitchbar = () => {
  return (
    <div>
      <Link to="all" className={RankStyle.RankSwitchBarLink}>
        전체
      </Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <Link to="study" className={RankStyle.RankSwitchBarLink}>
        스터디
      </Link>
    </div>
  );
};

export default RankSwitchbar;
