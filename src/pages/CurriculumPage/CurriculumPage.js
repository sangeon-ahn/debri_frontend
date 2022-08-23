import Header from '../Header/Header';
import './CurriculumPage.css';
import roadmapIcon from '../../assets/roadmapIcon.png';
import leftSideIcon from '../../assets/leftSideIcon.png';
import curriDurationIcon from '../../assets/curriDurationIcon.png';
import Lecture from '../LecturesPage/Lecture/Lecture';
import React ,{useState,useEffect, useRef}from 'react';
import ReactDOM, { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import CurriLecture from '../BeginPage/CurriLecture/CurriLecture';
import writeCommentIcon from '../../assets/writeCommentIcon.png';

export default function CurriculumPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { curriIdx } = params;
  const [curri, setCurri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [placeHolder, setPlaceHolder] = useState('한 줄 평 쓰기');
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');

  const headers = {
    'ACCESS-TOKEN': String(JSON.parse(localStorage.getItem("userData")).jwt),
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  useEffect( () =>{
    getCurriDetail(curriIdx);
    // getCurriReview(curriIdx);
  },[]);


  const getCurriDetail = async (curriIdx) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/curri/getThisCurri/${curriIdx}`, { headers });
      console.log("커리 디테일", response);
      setCurri(response.data.result);
    } catch (e) {
      console.log("커리 디테일 오류", e);
      setError(e);
    }
    setLoading(false);
  };
  

  //리뷰 가져오기
  const getCurriReview = async (curriIdx) => {
    try {
        setError(null);
        setLoading(true); //로딩이 시작됨
        const response = await axios.get(`/api/curri/review/getList/${curriIdx}`, { headers });
        setComments(response.data.result);
        console.log(response.data.result);
    } catch (e) {
        setError(e);
    }
    setLoading(false);
  };



  //리뷰쓰기
  const handleCommentInput = (e) => {
    setCommentContent(e.target.value);
  };

  const handleEnterInput = async (curriIdx, content) => {
    try {
      const response = await axios.post(`/api/curri/review/create`,
        JSON.stringify(
          {
            curriIdx: curriIdx,
            authorName: `${JSON.parse(localStorage.getItem("userData")).userName}`,
            content: content
          }),
          { headers }
      );

      console.log(response.data.result);
      setComments([...comments, response.data.result]);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  
  if (curri === null) return null;
  return (
    <>
    {curri && 
      <>
        <Header />
        <div className="roadmap">
          <div className="roadmap-back-box" onClick={() => navigate(-1)}>
            <img src={leftSideIcon} alt="" />
          </div>
          <div className="roadmap-icon-box">
            <img src={roadmapIcon} alt="" />
          </div>
          <div className="roadmap-detail-box">
            <div className="roadmap-title">{curri.curriName}</div>
            <div className="roadmap-description">JAVA는 이걸로 자바봐...</div>
            <div className="madeby">
              <div className="by">by</div>
              <div className="team-debri">{curri.curriAuthor}</div>
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
          {/* <Lecture lecture={lecture} isLectureScrapped={true} /> */}
          {curri.lectureListResList.map(lecture =>
                  <CurriLecture lecture={lecture} key={lecture.lectureIdx} />
                )}
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
          <button className="curri-start">시작하기</button>
        </div>
        <div className='user-number'>총 1089명이 이 커리큘럼을 활용했어요!</div>
        <div className='lectures-in-curr-container' style={{padding:'0'}}>
          {/* <Lecture lecture={lecture} isLectureScrapped={true} /> */}
          {curri.lectureListResList.map(lecture =>
                  <CurriLecture lecture={lecture} key={lecture.lectureIdx}/>
                )}
        </div>
      </div>}

      {curri && <div className='CurriReview'>
            <div className='CurriReviewTitle'>유저들의 한 줄 평</div>
              <div className='CurriReviewLive'>● LIVE</div>
              {comments && <div style={{marginBottom:'100px'}}>
                {comments.map((reivew,i) => (
                  <div key={i} className='CurriReviewContents'>
                    <div className='CurriReviewContent'>{reivew.content}</div>
                    <div className='CurriReviewName'><span style={{fontSize:'9px'}}>by </span>{reivew.authorName}</div>
                  </div>
                ))}
              </div>}
            </div>}

            <div className="writeComment-box">
              <div className="writeComment-icon-box">
                <img src={writeCommentIcon} alt="" />
              </div>
              <input
                type="text"
                className="writeComment-input"
                placeholder={placeHolder ? placeHolder : "한 줄 평 쓰기"}
                value={commentContent}
                onChange={handleCommentInput}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") {
                    return;
                  }
                  handleEnterInput(curriIdx, commentContent);
                  setCommentContent('');
                }}
              />
            </div>
            <div className="bottomBar-blocker2"></div>
      </>
    }
    </>
  )
}

