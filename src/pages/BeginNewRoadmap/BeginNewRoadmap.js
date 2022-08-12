import Header from "../Header/Header";
import roadmapIcon from '../../assets/roadmapIcon.png';
import leftSideIcon from '../../assets/leftSideIcon.png';
import './BeginNewRoadmap.css';
import curriDurationIcon from '../../assets/curriDurationIcon.png';
import roadmapOrderIcon from '../../assets/roadmapOrderIcon.png';
import roadmapCheckboxIcon from '../../assets/roadmapCheckboxIcon.png';
import Lecture from "../LecturesPage/Lecture/Lecture";
import { useState } from "react";

export default function BeginNewRoadmap() {
  const initLecture = {
    langTag: "Python",
    lectureName: "파이썬 정복자",
    chapterNumber: 4,
    materialType: '인강',
    pricing: '500백만'
  };

  const [lecture, setLecture] = useState(initLecture);

  return (
    <>
      <Header />
      <div className="roadmap">
        <div className="roadmap-back-box">
          <img src={leftSideIcon} alt="" />
        </div>
        <div className="roadmap-icon-box">
          <img src={roadmapIcon} alt="" />
        </div>
        <div className="roadmap-detail-box">
          <div className="roadmap-title">서버 로드맵</div>
          <div className="roadmap-description">Server 및 Backend 에 대한 기초 및 심화</div>
          <div className="madeby">
            <div className="by">by</div>
            <div className="team-debri">Team Debri</div>
          </div>
        </div>
      </div>
      <div className="curri-durration-and-start-container">
        <div className="curri-duration">
          <div className="curri-duration-arrow">
            <img src={curriDurationIcon} alt="" />
          </div>
          <div className="curri-duration-content">
            <div className="curri-duration-text">커리큘럼 진행 기간</div>
            <div className="curri-duration-main">
              <div className="curri-duration-day">100</div>
              <div className="day">일</div>
            </div>
          </div>
        </div>
        <button className="curri-start">시작하기</button>
      </div>
      <div className="roadmap-full-container">
        <div className="roadmap-orders-container">
          <div className="roadmap-order-container">
            <img src={roadmapOrderIcon} alt="" />
          </div>
          <div className="roadmap-order-container">
            <img src={roadmapOrderIcon} alt="" />
          </div>
          <div className="roadmap-order-container">
            <img src={roadmapOrderIcon} alt="" />
          </div>
        </div>
        <div className="roadmap-contents-container">
          <div className="roadmap-content-layer1">
            <div className="roadmap-content-layer2">
              <div className="roadmap-content">
                <div className="roadmap-content-title">1. Basic Tools</div>
                <div className="roadmap-content-description">Linux 에 대한 이해</div>
              </div>
              <div className="roadmap-content-checkbox">
                <img src={roadmapCheckboxIcon} alt="" />
              </div>
            </div>
          </div>
          <div className="roadmap-content-layer1">
            <div className="roadmap-content-layer2">
              <div className="roadmap-content">
                <div className="roadmap-content-title">2. Back-end 기초</div>
                <div className="roadmap-content-description">
                  <div>Language [Python / JAVA]</div>
                  <div>DBMS [MySQL / SQL]</div>
                  <div>프레임워크 [Spring / Node / 장고]</div>
                </div>
              </div>
              <div className="roadmap-content-checkbox">
                <img src={roadmapCheckboxIcon} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative-lectures-container">
        <div className="relative-lectures-title">관련 강의자료</div>
        <div className="relative-lectures">
          <Lecture lecture={lecture} isScrappedLecture={false} />
        </div>
      </div>
    </>
  )
}