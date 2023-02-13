import { Link } from "react-router-dom";

import ProfileStyle from "../../Style/Profile/Profile.module.css";
import BadgeStyle from "../../Style/Profile/Badge.module.css";
import babypic from "../../assets/image/baby.png";
import birdfirst from "../../assets/image/bird1level.png";
import { useState } from "react";

const ProfileBody = ({ userbadge }) => {
  const [userGit, setUserGit] = useState(null);
  return (
    <div className={ProfileStyle.ProfileUserContainer}>
      <div className={ProfileStyle.profileStreak}>
        <img
          src="https://ghchart.rshah.org/8A6BCD/jinseoplee"
          style={{ width: "85%" }}
          alt="스트릭"
        />
      </div>
      <div className={ProfileStyle.profileBadge}>
        <div className={ProfileStyle.profilebadgeside}>
          <p>뱃지 목록</p>
          <Link to="/badge" className={ProfileStyle.profilelink}>
            <p>+</p>
          </Link>
        </div>
        <div className={ProfileStyle.badgeBox}>
          <div className={BadgeStyle.BadgeBox}>
            {userbadge.map((badge) => (
              <div key={badge.id} className={BadgeStyle.BadgeMyList}>
                {badge.name === "신입" && (
                  <img alt="baby" src={babypic} style={{ width: "90px" }}></img>
                )}
                {badge.name === "출석 1단계" && (
                  <img
                    alt="bird1"
                    src={birdfirst}
                    style={{ width: "90px" }}
                  ></img>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBody;
