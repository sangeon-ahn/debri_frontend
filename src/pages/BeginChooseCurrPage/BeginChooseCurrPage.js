import Header from "../Header/Header";
import './BeginChooseCurrPage.css';
import roadmapIcon from '../../assets/orbit.gif';
import roadmapRightArrowIcon from '../../assets/roadmapRightArrowIcon.png';
import curriCircleIcon from '../../assets/curriCircleIcon.png';
import curriMiniPlusIcon from '../../assets/curriMiniPlusIcon.png';
import JavaCurriIcon from '../../assets/JavaCurriIcon.png';
import { useNavigate } from "react-router-dom";
import TopTenCurriculum from "./TopTenCurriculum";
import axios from "axios";
import { useEffect, useState } from "react";
import Roadmap from "./Roadmap/Roadmap";

export default function BeginChooseCurrPage() {
  const navigate = useNavigate();
  const headers = {
    'ACCESS-TOKEN': `${JSON.parse(localStorage.getItem("userData")).jwt}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  const [topTenCurriList, setTopTenCurriList] = useState(null);
  const [roadmapList, setRoadmapList] = useState(null);
  const [error, setError] = useState(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const getTopTenCurriList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/curri/scrap/topList`, { headers });
      console.log(response);
      setTopTenCurriList(response.data.result);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  const getRoadmapList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/lecture/roadmap/list`, { headers });
      console.log(response);
      setRoadmapList(response.data.result);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  }

  useEffect(() => {
    getTopTenCurriList();
    getRoadmapList();
  }, []);

  if (error) return null;

  return (
    <>
      <Header />
      <div className="start-new-curr-text-box">
        <div className="start-new-curr-text-bold">새로운 커리큘럼 시작하기</div>
        <div className="start-new-curr-text-light">"눌러서 새로운 강의를 찾아보기"</div>
      </div>
      {(topTenCurriList && roadmapList) &&
        <div className="choose-curri-scroll-container">
          <div className="roadmaps-area">
            <div className="roadmaps-area-title">
              데브리에서 제공하는 맞춤형 로드맵
            </div>
            <div className="roadmaps-container">
              {roadmapList.map(roadmap => {
                return <Roadmap roadmap={roadmap} key={roadmap.roadmapIdx}/>
                })
              }
              {/* <div className="roadmap">
                <div className="roadmap-icon-box">
                  <img src={roadmapIcon} alt="" />
                </div>
                <div className="roadmap-navi-container" onClick={() => navigate('/roadmaps?field=server')}>
                  <div className="roadmap-detail-box">
                    <div className="roadmap-title">서버 로드맵</div>
                    <div className="roadmap-description">Server 및 Backend 에 대한 기초 및 심화</div>
                    <div className="madeby">
                      <div className="by">by</div>
                      <div className="team-debri">Team Debri</div>
                    </div>
                  </div>
                  <div className="roadmap-main-go-button-box">
                    <img src={roadmapRightArrowIcon} alt="" />
                  </div>
                </div>
              </div>
              <div className="roadmap">
                <div className="roadmap-icon-box">
                  <img src={roadmapIcon} alt="" />
                </div>
                <div className="roadmap-navi-container" onClick={() => navigate('/roadmaps?field=android')}>
                  <div className="roadmap-detail-box">
                    <div className="roadmap-title">안드로이드 로드맵</div>
                    <div className="roadmap-description">Server 및 Backend 에 대한 기초 및 심화</div>
                    <div className="madeby">
                      <div className="by">by</div>
                      <div className="team-debri">Team Debri</div>
                    </div>
                  </div>
                  <div className="roadmap-main-go-button-box">
                    <img src={roadmapRightArrowIcon} alt="" />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className="curriculums-area">
            <div className="curriculums-area-title">
              유저들이 제공하는 커리큘럼 TOP 10
            </div>
            <div className="curriculums-container">
              {topTenCurriList.map(curri => {
                return <TopTenCurriculum curri={curri} key={curri.curriIdx} />
              })}
            </div>
          </div>
          <div className="start-new-curriculum-area" onClick={() => navigate('/createCurri')}>
            <button className="start-new-curriculum-box">
              <img src={curriMiniPlusIcon} alt="" className="start-curri-mini-plus-icon"/>
            </button>
            <div className="start-new-curriculum-text">새로운 커리큘럼 시작하기</div>
          </div>
        </div>
      }
    </>
  );
}