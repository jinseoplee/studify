import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RoungeStyle from "../../Style/StudyRounge/StudyRounge.module.css";

const RoungeBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={RoungeStyle.RoungeBannerContainer}>
      <Slider {...settings}>
        <div className={RoungeStyle.RoungeBannerBox_1}>
          <p className={RoungeStyle.Banner1Title}>광고 자리</p>
          <h3>1</h3>
        </div>
        <div className={RoungeStyle.RoungeBannerBox}>
          <h3>2</h3>
        </div>
        <div className={RoungeStyle.RoungeBannerBox}>
          <h3>3</h3>
        </div>
      </Slider>
    </div>
  );
};

export default RoungeBanner;
