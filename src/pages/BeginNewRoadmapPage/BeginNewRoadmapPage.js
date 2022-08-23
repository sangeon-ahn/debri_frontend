import Header from "../Header/Header";
import roadmapIcon from '../../assets/roadmapIcon.png';
import leftSideIcon from '../../assets/leftSideIcon.png';
import './BeginNewRoadmapPage.css';
import curriDurationIcon from '../../assets/curriDurationIcon.png';
import roadmapOrderIcon from '../../assets/roadmapOrderIcon.png';
import roadmapCheckboxIcon from '../../assets/roadmapCheckboxIcon.png';
import Lecture from "../LecturesPage/Lecture/Lecture";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import RoadmapChild from "./RoadmapChild/RoadmapChild";
import RoadmapLecture from "./RoadmapLecture/RoadmapLecture";

export default function BeginNewRoadmapPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [lectures, setLectures] = useState(null);
  const [roadmap, setRoadmap] = useState(null);

  const headers = {
    'ACCESS-TOKEN': String(JSON.parse(localStorage.getItem("userData")).jwt),
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  console.log(searchParams.get('field'));
  const getRoadmapDetail = async (mod) => {
    try {
      const response = await axios.get(`/api/lecture/roadmap/view?mod=${mod}`, { headers });
      setRoadmap(response.data.result[0]);
      console.log(response.data.result[0]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const field = searchParams.get('field');
    getRoadmapDetail(field);
  }, []);

  useEffect(() => {
    if (!roadmap) return;
    const lectureList = [];

    for (let i = 0; i < roadmap.roadmapChildCurriList.length; i++) {
      lectureList.push(...roadmap.roadmapChildCurriList[i].roadmapChildLectureList);
    }
    setLectures(lectureList);
  }, [roadmap]);

  return (
    <>
      <Header />
      {roadmap &&
        <>
          <div className="roadmap">
            <div className="roadmap-back-box" onClick={() => navigate(-1)}>
              <img src={leftSideIcon} alt="" />
            </div>
            <div className="roadmap-icon-box">
              <img src={roadmapIcon} alt="" />
            </div>
            <div className="roadmap-detail-box">
              <div className="roadmap-title">{roadmap.roadmapName}</div>
              <div className="roadmap-description">{roadmap.roadmapExplain}</div>
              <div className="madeby">
                <div className="by">by</div>
                <div className="team-debri">{roadmap.authorName}</div>
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
                  <div className="curri-duration-day">{roadmap.requireDay}</div>
                  <div className="day">일</div>
                </div>
              </div>
            </div>
            <button className="curri-start">시작하기</button>
          </div>
          <div className="roadmap-full-container">
            {/* <div className="roadmap-orders-container">
              <div className="roadmap-order-container">
                <img src={roadmapOrderIcon} alt="" />
              </div>
              <div className="roadmap-order-container">
                <img src={roadmapOrderIcon} alt="" />
              </div>
              <div className="roadmap-order-container">
                <img src={roadmapOrderIcon} alt="" />
              </div>
            </div> */}
            <div className="roadmap-contents-container">
              {roadmap.roadmapChildCurriList.map(child => 
                <RoadmapChild curri={child} setLectures={setLectures} key={child.childCurriIdx}/>
              )}
            </div>
          </div>
          <div className="relative-lectures-container">
            <div className="relative-lectures-title">관련 강의자료</div>
            <div className="relative-lectures">
              {lectures && lectures.map(lecture => 
                <RoadmapLecture lecture={lecture} isScrappedLecture={lecture.userScrap} />
              )}
            </div>
          </div>
        </>
      }
    </>
  )
}