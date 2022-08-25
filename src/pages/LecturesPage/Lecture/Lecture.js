import "./Lecture.css";
import unScrappedStar from "../../../assets/emptyStar.png";
import scrappedStar from '../../../assets/favoriteStar.png';
import lectureLikesIcon from '../../../assets/lectureLikesIcon.png';
import lectureUserNumberIcon from '../../../assets/curriUserNumberIcon.png';
import lectureDetailIcon from '../../../assets/lectureDetailIcon.png';
import grayHeart from '../../../assets/grayHeart.png';
import greenHeart from '../../../assets/greenHeart.png';
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

export default function Lecture(props) {
  const navigate = useNavigate();
  const { lecture, isScrappedLecture } = props;
  const [error, setError] = useState(false);
  const [isScrapped, setIsScrapped] = useState(isScrappedLecture);
  console.log(isScrapped);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const headers = {
    'ACCESS-TOKEN': `${JSON.parse(localStorage.getItem("userData")).jwt}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
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

  const postLectureScrap = async (lectureIdx) => {
    try {
      const response = await axios.post(`${baseUrl}/api/lecture/scrap/create`,
        JSON.stringify({
          userIdx: userData.userIdx,
          lectureIdx: lectureIdx
        }),
        { headers });
      } catch (e) {
        setError(e);
        console.log(e);
      }
    };
  
  const postLectureUnScrap = async (lectureIdx) => {
    try {
      const response = await axios.patch(`${baseUrl}/api/lecture/scrap/delete`,
        JSON.stringify({
          userIdx: userData.userIdx,
          lectureIdx: lectureIdx
        }),
        { headers });
      } catch (e) {
        setError(e);
        console.log(e);
      }
    };

  const lectureScrap = () => {
    postLectureScrap(lecture.lectureIdx);
    setIsScrapped(state => !state);
  };

  const lectureUnScrap = () => {
    postLectureUnScrap(lecture.lectureIdx);
    setIsScrapped(state => !state);
  }

  if (error) return null;

  return (
    <div className="lecture">
            <div className="lecture-scrap-box">
              {isScrapped ?
                <img src={scrappedStar} alt="" style={{cursor: 'pointer'}} onClick={lectureUnScrap}/> :
                <img src={unScrappedStar} alt="" style={{cursor: 'pointer'}} onClick={lectureScrap}/>
              }
            </div>
            <div className="lecture-description" onClick={()=>{navigate(`/lectures/detail/${lecture.lectureIdx}`)}}>
              <div className={setColor(lecture)}>{lecture.langTag}</div>
              <div className="lecture-title-box">
                <div className="lecture-name">{lecture.lectureName}</div>
                <div className="lecture-chapters">({lecture.chapterNumber}챕터)</div>
              </div>
              <div className="lecture-info">
                <div>
                  {lecture.userLike ?
                    <img src={greenHeart} alt='' style={{height: '10px',width: '11.5px', margin:'2px 7px'}}/> :
                    <img src={grayHeart} alt='' style={{height: '10px',width: '11.5px', margin:'2px 7px'}}/>
                  }
                </div>
                <div className="lecture-likes-number">{lecture.likeNumber === undefined ? lecture.lectureLikeCount : lecture.likeNumber}</div>
                <div>
                  <img className="lecture-user-number-icon" src={lectureUserNumberIcon} alt="" />
                </div>
                <div className="lecture-likes-number">{lecture.usedCount}</div>
                <div className="lecture-info-vertical-line"></div>
                <div className="lecture-material-type">#{lecture.materialType === undefined ? lecture.type : lecture.materialType}</div>
                <div className="lecture-price">#{lecture.pricing}</div>
              </div>
            </div>
            <div className="lecture-detail-box">
              <img src={lectureDetailIcon} alt="" />
            </div>
          </div>
  )
}