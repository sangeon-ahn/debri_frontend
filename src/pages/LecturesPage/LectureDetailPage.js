import React ,{useState,useEffect, useRef}from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import Header from '../Header/Header';
import favoriteStar from '../../assets/favoriteStar.png';
import emptyStar from '../../assets/emptyStar.png';
import whiteHeart from '../../assets/whiteHeart.png';
import left_slide from '../../assets/left_slide.png';
import grayHeart from '../../assets/grayHeart.png';
import greenHeart from '../../assets/greenHeart.png';
import lectureUserNumberIcon from '../../assets/curriUserNumberIcon.png';
import writeCommentIcon from '../../assets/writeCommentIcon.png';
import { AddLectureSnackbar } from "./AddLectureSnackbar/AddLectureSnackbar";
import {useRecoilState} from 'recoil';
import {AddSnackbarOpen} from '../../Atom';
import externalLinkIcon from '../../assets/externalLinkIcon.png';
import liveIcon from '../../assets/liveIcon.png';
import useInterval from '../CurriculumTabPage/useInterval';

export default function LecturesDeatilPage() {
    const params = useParams();
    const navigate = useNavigate();
    const [placeHolder, setPlaceHolder] = useState('한 줄 평 쓰기');
    const [lectureDetail,setLectureDetail] = useState(null);   //결과값
    const [loading,setLoading] = useState(false); // 로딩되는지 여부
    const [error,setError] = useState(null); //에러
    const [lectureLikeStatus, setLectureLikeStatus] = useState(null);
    const [pureStatus, setPureStatus] = useState(true);
    const [lectureLikes, setLectureLikes] = useState(0);
    const [lectureScrapStatus, setLectureScrapStatus] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState('');
    const [addSnackbarOpen, setAddSnackbarOpen] = useRecoilState(AddSnackbarOpen);
    const [visibility, setVisibility] = useState(true);

    const baseUrl = process.env.REACT_APP_BASE_URL;
    const headers = {
        'ACCESS-TOKEN': `${JSON.parse(localStorage.getItem("userData")).jwt}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    //강의 세부 데이터 조회
    useEffect( () =>{
        fetchLectureDetail(params.lectureIdx);
        fetchLectureReview(params.lectureIdx);
    },[]);

    useEffect(() => {
      if (!lectureDetail) {
        return;
      }
      if (lectureDetail.userLike) {
        setLectureLikes(lectureDetail.likeNumber);
        setLectureLikeStatus(true);
      } else if (!lectureDetail.userLike) {
        setLectureLikes(lectureDetail.likeNumber);
        setLectureLikeStatus(false);
      } 
      if (lectureDetail.userScrap) {
        setLectureScrapStatus(true);
      } else if (!lectureDetail.userScrap) {
        setLectureScrapStatus(false);
      }
    }, [lectureDetail]);
  
    useEffect(() => {
      if (lectureLikeStatus !== null && !pureStatus) {
        if (lectureLikeStatus) {
          setLectureLikes(state => state + 1);
        } else {
          setLectureLikes(state => state - 1);
      }
      }
    }, [lectureLikeStatus, pureStatus]);

    const fetchLectureDetail = async (lectureIdx) => {
        try {
            setError(null);
            setLoading(true); //로딩이 시작됨
            const response = await axios.get(`${baseUrl}/api/lecture/getLecture/${lectureIdx}`, { headers });
            setLectureDetail(response.data.result);
            console.log(response.data.result);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };

    const setColor = (lecture) => {
      if (lecture.langTag === "Front") {
        return 'lecture-subject red';
      } else if (lecture.langTag === 'Back') {
        return 'lecture-subject green';
      } else if (lecture.langTag === 'C 언어') {
        return 'lecture-subject gray';
      } else if (lecture.langTag === 'Python') {
        return 'lecture-subject blue';
      }
    };

    // 스크랩
    async function scrapLecture(lectureIdx) {
      try {
        const response = await axios.post(`${baseUrl}/api/lecture/scrap/create`,
          JSON.stringify({
            userIdx : `${JSON.parse(localStorage.getItem("userData")).userIdx}`,
            lectureIdx : lectureIdx
          }),
          { headers }
        );
        console.log('리턴', response);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }

    async function unScrapLecture(lectureIdx) {
      try {
        const response = await axios.patch(`${baseUrl}/api/lecture/scrap/delete`,
          JSON.stringify({
            userIdx : `${JSON.parse(localStorage.getItem("userData")).userIdx}`,
            lectureIdx : lectureIdx
          }),
          { headers }
        );
        console.log('리턴', response);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }
  
    const handleScrap = () => {
      scrapLecture(params.lectureIdx);
      setLectureScrapStatus(true);
    };
  
    const handleUnScrap = () => {
      unScrapLecture(params.lectureIdx);
      setLectureScrapStatus(false)
    };

    // 추천
    async function likeLecture(lectureIdx) {
      try {
        const response = await axios.post(`${baseUrl}/api/lecture/like/create?lectureIdx=${lectureIdx}`,
          JSON.stringify({}),
          { headers }
        );
        console.log('리턴', response);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }

    async function unLikeLecture(lectureIdx) {
      try {
        const response = await axios.patch(`${baseUrl}/api/lecture/like/delete?lectureIdx=${lectureIdx}`,
          JSON.stringify({}),
          { headers }
        );
        console.log('리턴', response);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }
  
    const handleLike = () => {
      likeLecture(params.lectureIdx);
      setLectureLikeStatus(true);
      setPureStatus(false);
    };
  
    const handleUnLike = () => {
      unLikeLecture(params.lectureIdx);
      setLectureLikeStatus(false)
      setPureStatus(false);
    };

    //리뷰 가져오기
    const fetchLectureReview = async (lectureIdx) => {
      try {
          setError(null);
          setLoading(true); //로딩이 시작됨
          const response = await axios.get(`${baseUrl}/api/lecture/review/get?lectureIdx=${lectureIdx}`, { headers });
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
    const handleEnterInput = async (lectureIdx, content) => {
      try {
        const response = await axios.post(`${baseUrl}/api/lecture/review/create`,
          JSON.stringify(
            {
              lectureIdx: lectureIdx,
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

    const openExternalPage = () => {
      window.open(lectureDetail.srcLink, '_blank');
    };

    const handleScrapSnackbarClose = (e, reason) => {
      if (reason === 'clickway') {
          return;
      }
        setAddSnackbarOpen(false);
    };

    const liveIconStyle = {
      opacity: visibility ? '1' : '0',
      transition: 'all .0.5s ease-out'
    };

    useInterval(() => setVisibility(state => !state), 1000);


    return (
        <div>
          <Header/>
          <div className="LectureDetail" style={{color:'white'}}>
            <img className="left_slide" src={left_slide} alt='' onClick={()=>{navigate(-1)}}/>
            {lectureDetail && <div className='LectureDetailContent'>
              <div style={{height:'110px'}}>
                <div className='lecture_title'>
                  <div className={setColor(lectureDetail)} style={{width: '40px', height: '16px'}}>{lectureDetail.langTag}</div>
                  <div>{lectureDetail.lectureName}</div>
                </div>
                <div className='lecture_info'>
                  <div>총 {lectureDetail.chapterNumber}챕터
                    {lectureScrapStatus ?
                      <button className='favorite-button' onClick={handleUnScrap}>
                        <img src={favoriteStar} alt=''/>
                      </button> :
                      <button className='favorite-button' onClick={handleScrap}>
                        <img src={emptyStar} alt=''/>
                      </button>
                    }
                  </div>
                  <div className='lecture_info_1'>#{lectureDetail.materialType}</div>
                  <div className='lecture_info_1'>#{lectureDetail.pricing}</div>
                </div>
              </div>
              <div className='lecture_desc'>{lectureDetail.lectureDesc}</div>
              <div className='lecture_reco'>
                <div>
                  {lectureLikeStatus ?
                    <img src={greenHeart} alt='' style={{height: '12.4px',width: '14.3px'}}/> :
                    <img src={grayHeart} alt='' style={{height: '12.4px',width: '14.3px'}}/>
                  }
                  <span style={{margin:'5px', fontSize:'14px'}}>{lectureLikes}</span>명이 강의를 추천했어요!
                </div>
                <div>
                  <img className="addCurri" src={lectureUserNumberIcon} alt="" />
                  <span style={{margin:'5px', fontSize:'14px'}}>{lectureDetail.usedCount}</span>명이 강의를 커리큘럼에 추가했어요! 
                </div>
              </div>
              <div style={{alignItems: 'center', display: 'flex'}}>
              <button className='add_curri' onClick={() => {navigate('/addLectureToCurri', {state: lectureDetail})}}>커리큘럼에 추가하기</button>
                <button className='srcLink' onClick={openExternalPage}>
                  <div className='external-link-icon-box'>
                    <img src={externalLinkIcon} alt="" />
                  </div>
                  <div className='check-lecture-info-text'>강의 정보 확인하기</div>
                </button>
              </div>
          
              {lectureLikeStatus ?
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
            </div>}
            
            <div style={{width: '200px',height: '0px', borderBottom: '2px solid #1D361D', margin:'30px auto'}}></div>

            {lectureDetail && <div className='LectureReview'>
              <div className='LectureReviewTitle'>유저들의 한 줄 평</div>
              <div className='latest-curries-live'>
                <div className='onair-icon-box' alt="">
                  <img src={liveIcon} alt="" style={liveIconStyle}/>
                </div>
                <div className='live-text'>LIVE</div>
              </div>
              {comments && <div style={{marginBottom:'100px'}}>
                {comments.map((reivew,i) => (
                  <div key={i} className='LectureReviewContents'>
                    <div className='LectureReviewContent'>{reivew.content}</div>
                    <div className='LectureReviewName'><span style={{fontSize:'9px', fontWeight: '400'}}>by&nbsp;  </span>{reivew.authorName}</div>
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
                  handleEnterInput(params.lectureIdx, commentContent);
                  setCommentContent('');
                }}
              />
            </div>
            <div className="bottomBar-blocker2"></div>
          </div>
          <AddLectureSnackbar handleClose={handleScrapSnackbarClose} open={addSnackbarOpen}/>
        </div>
    )
}