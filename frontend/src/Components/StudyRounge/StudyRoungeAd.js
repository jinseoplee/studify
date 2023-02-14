import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Ad from "../../assets/image/Banner_Ad.jpg";
import userguide from "../../assets/image/userguide8.PNG";
import wait from "../../assets/image/wait.jpg";
import openstudyAdStyle from "../../Style/OpenStudy/OpenStudyAd.module.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import { useNavigate } from "react-router-dom";

const StudyRoungeAd = () => {
  const navigate = useNavigate();
  const gotoExplainPage = () => {
    navigate("/study/explain");
  };
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        freeMode={true}
        watchOverflow={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className={openstudyAdStyle.mySwiper}
      >
        <SwiperSlide>
          <img
            src={userguide}
            className={openstudyAdStyle.adSize}
            onClick={gotoExplainPage}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Ad} className={openstudyAdStyle.adSize} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={wait} className={openstudyAdStyle.adSize} />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default StudyRoungeAd;
