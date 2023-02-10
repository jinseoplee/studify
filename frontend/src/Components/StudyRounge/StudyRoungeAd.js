import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Ad from "../../assets/image/Banner_Ad.jpg";
import openstudyAdStyle from "../../Style/OpenStudy/OpenStudyAd.module.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

const StudyRoungeAd = () => {
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
          <img src={Ad} className={openstudyAdStyle.adSize} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Ad} className={openstudyAdStyle.adSize} />
        </SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
};

export default StudyRoungeAd;
