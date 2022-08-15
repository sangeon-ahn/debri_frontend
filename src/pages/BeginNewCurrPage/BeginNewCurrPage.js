import Header from '../Header/Header';
import './BeginNewCurrPage.css';
import roadmapIcon from '../../assets/roadmapIcon.png';
import leftSideIcon from '../../assets/leftSideIcon.png';
import curriDurationIcon from '../../assets/curriDurationIcon.png';
import Lecture from '../LecturesPage/Lecture/Lecture';
import { useState } from 'react';
export default function BeginNewCurrPage() {
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
          <div className="roadmap-title">"자바 첫 걸음"</div>
          <div className="roadmap-description">JAVA는 이걸로 자바봐...</div>
          <div className="madeby">
            <div className="by">by</div>
            <div className="team-debri">자바왕 김자바</div>
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
      <div className='user-number'>총 1089명이 이 커리큘럼을 활용했어요!</div>
      <div className='lectures-in-curr-container'>
        <Lecture lecture={lecture} isLectureScrapped={true} />
      </div>
      <div className='user-reviews-area'>
        <div className='user-reviews-title'>유저들의 커리큘럼 한줄평</div>
        <div className='user-reviews-container'>
          <div className='user-review'>
            <div className='user-review-text'>
              자바가 너무 쉬워졌어요 어떡하죠?
            </div>
            <div className='review-container'>
              <div className='review-by'>by</div>
              <div className='review-who'>데브리 짱짱맨</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

