import Header from "../Header/Header";
import './BeginChooseCurrPage.css';
import roadmapIcon from '../../assets/orbit.gif';
import roadmapRightArrowIcon from '../../assets/roadmapRightArrowIcon.png';
import curriCircleIcon from '../../assets/curriCircleIcon.png';
import curriMiniPlusIcon from '../../assets/curriMiniPlusIcon.png';
import JavaCurriIcon from '../../assets/JavaCurriIcon.png';

export default function BeginChooseCurrPage() {
  return (
    <>
      <Header />
      <div className="start-new-curr-text-box">
        <div className="start-new-curr-text-bold">새로운 커리큘럼 시작하기</div>
        <div className="start-new-curr-text-light">"눌러서 새로운 강의를 찾아보기"</div>
      </div>
      <div className="roadmaps-area">
        <div className="roadmaps-area-title">
          데브리에서 제공하는 맞춤형 로드맵
        </div>
        <div className="roadmaps-container">
          <div className="roadmap">
            <div className="roadmap-icon-box">
              <img src={roadmapIcon} alt="" />
            </div>
            <div className="roadmap-navi-container">
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
            <div className="roadmap-navi-container">
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
          </div>
        </div>
      </div>
      <div className="curriculums-area">
        <div className="curriculums-area-title">
          유저들이 제공하는 커리큘럼 TOP 10
        </div>
        <div className="curriculums-container">
          <div className="curriculum">
          <div className="curriculum-Icon-box">
              <img src={JavaCurriIcon} alt="" />
            </div>
            <div className="roadmap-detail-box">
              <div className="roadmap-title">"자바 첫 걸음"</div>
              <div className="roadmap-description">JAVA는 이걸로 자바봐...</div>
              <div className="madeby">
                <div className="by">by</div>
                <div className="team-debri">자바왕 김자바</div>
              </div>
            </div>
            <div className="roadmap-main-go-button-box">
              <img src={roadmapRightArrowIcon} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="start-new-curriculum-area">
        <div className="start-new-curriculum-box">
          <img src={curriCircleIcon} alt="" className="start-curri-circle-icon"/>
          <img src={curriMiniPlusIcon} alt="" className="start-curri-mini-plus-icon"/>
        </div>
        <div className="start-new-curriculum-text">새로운 커리큘럼 시작하기</div>
      </div>
    </>
  );
}