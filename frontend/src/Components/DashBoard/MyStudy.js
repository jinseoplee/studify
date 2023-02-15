import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch } from "react-redux";
import { Autoplay, Pagination, Navigation } from "swiper";
import Dashboardstyle from "../../Style/Dashboard/Dashboard.module.css";
import makestudy from "../../assets/image/plus.png";
import { selectdayActions } from "../../store/StudyStore";

//swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const MyStudy = ({ studies }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const studyClickHandler = (params, e) => {
    e.preventDefault();
    dispatch(selectdayActions.changestudynum(params));
    navigate(`/study/${params}`);
  };

  //나의 스터디 리스트를 눌렀을 경우 리덕스에 그 번호 저장
  return (
    <div className={Dashboardstyle.MyStudycontainer}>
      <h3 style={{ fontSize: "20px" }}>나의 스터디</h3>
      <div className={Dashboardstyle.MyStudybox}>
        <Link to="/study/newstudy" className={Dashboardstyle.MyStudyMake}>
          <img
            className={Dashboardstyle.MyStudyMakeLogo}
            src={makestudy}
            alt="makestudy"
          />
        </Link>

        <div className={Dashboardstyle.MyStudyList}>
          {studies && studies.length === 1 && (
            <Swiper
              slidesPerView={1}
              spaceBetween={0}
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
            >
              {studies.map((study) => (
                <SwiperSlide>
                  <div
                    key={study.title}
                    onClick={(e) => {
                      studyClickHandler(study.id, e);
                    }}
                    className={Dashboardstyle.flexbox}
                  >
                    <div className={Dashboardstyle.MyStudyListItem}>
                      <p className={Dashboardstyle.rangebox}>
                        <p className={Dashboardstyle.MystudyTitle}>
                          {study.title}
                        </p>
                      </p>
                      <div className={Dashboardstyle.flexbox}>
                        {study.category &&
                          study.category.map((skill, index) => (
                            <div key={index}>
                              <p className={Dashboardstyle.MyStudyTag}>
                                {skill.name}
                              </p>
                            </div>
                          ))}
                      </div>
                      <div className={Dashboardstyle.MystudyListbox}>
                        <p>
                          인원 : {study.headcount} / {study.capacity}
                        </p>
                        <div className={Dashboardstyle.flexbox}>
                          일 정 :
                          {study.day &&
                            study.day.map((d, index) => (
                              <div key={d}>
                                <p>{d} </p>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          {studies && studies.length >= 2 && (
            <Swiper
              slidesPerView={2}
              spaceBetween={1}
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
            >
              {studies.map((study) => (
                <SwiperSlide>
                  <div
                    key={study.title}
                    onClick={(e) => {
                      studyClickHandler(study.id, e);
                    }}
                    className={Dashboardstyle.flexbox}
                  >
                    <div className={Dashboardstyle.MyStudyListItem}>
                      <p className={Dashboardstyle.rangebox}>
                        <p className={Dashboardstyle.MystudyTitle}>
                          {study.title}
                        </p>
                      </p>
                      <div className={Dashboardstyle.flexbox}>
                        {study.category &&
                          study.category.map((skill, index) => (
                            <div key={index}>
                              <p className={Dashboardstyle.MyStudyTag}>
                                {skill.name}
                              </p>
                            </div>
                          ))}
                      </div>
                      <div className={Dashboardstyle.MystudyListbox}>
                        <p>
                          인원 : {study.headcount} / {study.capacity}
                        </p>
                        <div className={Dashboardstyle.flexbox}>
                          일 정 :
                          {study.day &&
                            study.day.map((d, index) => (
                              <div key={d}>
                                <p>{d} </p>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          {/* <Swiper
            slidesPerView={1}
            spaceBetween={1}
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
          >
            {studies.map((study) => (
              <SwiperSlide>
                <div
                  key={study.title}
                  onClick={(e) => {
                    studyClickHandler(study.id, e);
                  }}
                  className={Dashboardstyle.flexbox}
                >
                  <div className={Dashboardstyle.MyStudyListItem}>
                    <p className={Dashboardstyle.rangebox}>
                      <p className={Dashboardstyle.MystudyTitle}>
                        {study.title}
                      </p>
                    </p>
                    <div className={Dashboardstyle.flexbox}>
                      {study.category &&
                        study.category.map((skill, index) => (
                          <div key={index}>
                            <p className={Dashboardstyle.MyStudyTag}>
                              {skill.name}
                            </p>
                          </div>
                        ))}
                    </div>
                    <div className={Dashboardstyle.MystudyListbox}>
                      <p>
                        인원 : {study.headcount} / {study.capacity}
                      </p>
                      <div className={Dashboardstyle.flexbox}>
                        일 정 :
                        {study.day &&
                          study.day.map((d, index) => (
                            <div key={d}>
                              <p>{d} </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper> */}
        </div>
      </div>
    </div>
  );
};

export default MyStudy;