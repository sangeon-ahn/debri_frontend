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
import greenHeart from '../../assets/greenHeart.png';
import whiteHeart from '../../assets/whiteHeart.png';
import { useRecoilState } from 'recoil';
import { lowbarSelect } from '../../Atom';
import curriIcon from '../../assets/orbit.gif';

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
  const [isCurriSuccess, setIsCopySuccess] = useState(false);
  const [curriLikeStatus, setCurriLikeStatus] = useState(false);
  const [curriLikes, setCurriLikes] = useState(0);
  const [pureStatus, setPureStatus] = useState(true);
  const [lowbar, setLowbar] = useRecoilState(lowbarSelect);

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const headers = {
    'ACCESS-TOKEN': String(JSON.parse(localStorage.getItem("userData")).jwt),
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    getCurriDetail(curriIdx);
    getCurriReview(curriIdx);
  },[]);

  useEffect(() => {
    if (isCurriSuccess) {
      navigate('/home');
      setLowbar({
        homeButton: true,
        lectureButton: false,
        boardButton: false,
        curriButton: false
      });
    }
  }, [isCurriSuccess]);

  useEffect(() => {
    if (!curri) {
      return;
    }
    console.log(curri);
    if (curri.curriLikeStatus === 'ACTIVE') {
      console.log('2', curri.curriLikeCount);
      setCurriLikes(curri.curriLikeCount);
      setCurriLikeStatus(true);
    } else if (curri.curriLikeStatus === 'INACTIVE') {
      setCurriLikes(curri.curriLikeCount);
      setCurriLikeStatus(false);
    }

    // if (curri.userScrap) {
    //   setLectureScrapStatus(true);
    // } else if (!curri.userScrap) {
    //   setLectureScrapStatus(false);
    // }
  }, [curri]);

  useEffect(() => {
    if (curriLikeStatus !== null && !pureStatus) {
      if (curriLikeStatus) {
        setCurriLikes(state => state + 1);
      } else {
        setCurriLikes(state => state - 1);
    }
    }
  }, [curriLikeStatus, pureStatus]);

  const getCurriDetail = async (curriIdx) => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/api/curri/getThisCurri/${curriIdx}`, { headers });
      console.log("커리 디테일", response);
      setCurri(response.data.result);
    } catch (e) {
      console.log("커리 디테일 오류", e);
      setError(e);
    }
    setLoading(false);
  };
  
  const postCopyCurri = async (targetCurriIdx, targetOwnerNickName) => {
    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/api/curri/copy`,
        JSON.stringify({
          targetCurriIdx: targetCurriIdx,
          targetOwnerNickName: targetOwnerNickName
        }),
      { headers });
      console.log('커리복사', response);
      setIsCopySuccess(response.data.result.curriCopySuccess);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  //리뷰 가져오기
  const getCurriReview = async (curriIdx) => {
    try {
        setError(null);
        setLoading(true); //로딩이 시작됨
        const response = await axios.get(`${baseUrl}/api/curri/review/getList/${curriIdx}`, { headers });
        setComments(response.data.result);
        console.log('리뷰', response.data.result);
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
      const response = await axios.post(`${baseUrl}/api/curri/review/create`,
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

  // 추천
  async function postLikeCurri(curriIdx) {
    try {
      const response = await axios.post(`${baseUrl}/api/curri/scrap/${curriIdx}`,
        JSON.stringify({}),
        { headers }
      );
      console.log('추천', response);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }

  async function patchUnlikeCurri(scrapIdx) {
    try {
      const response = await axios.patch(`${baseUrl}/api/curri/unScrap/${scrapIdx}`,
        JSON.stringify({}),
        { headers }
      );
      console.log('추천해제', response);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }

  const handleLike = () => {
    postLikeCurri(curriIdx);
    // getCurriDetail(curriIdx);
    setCurriLikeStatus(true);
    setPureStatus(false);
  };

  const handleUnLike = () => {
    patchUnlikeCurri(curri.scrapIdx);
    // getCurriDetail(curriIdx);
    setCurriLikeStatus(false)
    setPureStatus(false);
  };

  return (
    <>
    <Header />
    {curri && 
      <>
        <div className="curriculum-header">
          <div className="roadmap-back-box" onClick={() => navigate(-1)}>
            <img src={leftSideIcon} alt="" />
          </div>
          <div className='curri-img-box'>
            <img src={curriIcon} alt="" className='curri-icon'/>
          </div>
          <div className="roadmap-detail-box">
            <div className="roadmap-title">{curri.curriName}</div>
            <div className="roadmap-description">{curri.Desc}</div>
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
                <div className="curri-duration-day">{curri.totalDday}</div>
                <div className="day">일</div>
              </div>
            </div>
          </div>
          <button className="curri-start" onClick={() => {
            postCopyCurri(curriIdx, curri.curriAuthor);
          }}>시작하기</button>
        </div>
        <div className='curri-detail-scroll-area'>
          <div className='user-number'>총 {curriLikes}명이 이 커리큘럼을 추천했어요!</div>
          <div className='lectures-in-curr-container'>
            {/* <Lecture lecture={lecture} isLectureScrapped={true} /> */}
            {curri.lectureListResList.map(lecture =>
                    // <CurriLecture lecture={lecture} key={lecture.lectureIdx} />
                    <Lecture lecture={lecture} key={lecture.lectureIdx} isScrappedLecture={lecture.scrapStatus === 'ACTIVE' ? true : false} />
                  )}
          </div>
          <div style={{width: '200px',height: '0px', borderBottom: '2px solid #1D361D', margin:'30px auto'}}></div>
          {curriLikeStatus ?
                  <button className='likebtn' onClick={handleUnLike} style={{borderColor:'#66CC66', color:'#66CC66'}}>
                    <div className='curri-liked-box'>
                      <img src={greenHeart} alt=''/>
                    </div>
                    <div className='curri-like-text'>추천</div>
                  </button> :
                  <button className='likebtn' onClick={handleLike}>
                    <div className='curri-liked-box'>
                      <img src={whiteHeart} alt=''/>
                    </div>
                    <div>추천</div>
                  </button>
                }
          {/* <div className='user-reviews-area'>
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
          </div> */}
        {curri && <div className='CurriReview'>
              <div className='CurriReviewTitle'>유저들의 커리큘럼 한 줄 평</div>
                <div className='CurriReviewLive'>● LIVE</div>
                {comments && <div style={{marginBottom:'100px'}}>
                  {comments.map((reivew,i) => (
                    <div key={i} className='CurriReviewContents'>
                      <div className='CurriReviewContent'>{reivew.content}</div>
                      <div className='CurriReviewName'><span style={{fontSize:'9px', fontWeight: '400'}}>by &nbsp;</span>{reivew.authorName}</div>
                    </div>
                  ))}
                </div>}
              </div>}
        </div>
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

