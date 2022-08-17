import "./RoadmapLecture.css";
import unScrappedStar from "../../../assets/emptyStar.png";
import scrappedStar from '../../../assets/favoriteStar.png';
import lectureLikesIcon from '../../../assets/lectureLikesIcon.png';
import lectureUserNumberIcon from '../../../assets/curriUserNumberIcon.png';
import lectureDetailIcon from '../../../assets/lectureDetailIcon.png';
import axios from "axios";
import { useState } from "react";

export default function RoadmapLecture(props) {
  const { lecture, isScrappedLecture } = props;
  const [error, setError] = useState(false);
  const [isScrapped, setIsScrapped] = useState(isScrappedLecture);
  console.log(isScrapped);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const headers = {
    'ACCESS-TOKEN': `${JSON.parse(localStorage.getItem("userData")).jwt}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  const setColor = (lecture) => {
    if (lecture.childLangTag === "Front") {
      return 'lecture-subject red';
    } else if (lecture.childLangTag === 'Back') {
      return 'lecture-subject green';
    } else if (lecture.childLangTag === 'C 언어') {
      return 'lecture-subject gray';
    } else if (lecture.childLangTag === 'Python') {
      return 'lecture-subject blue';
    }
  };

  const postLectureScrap = async (lectureIdx) => {
    try {
      const response = await axios.post(`/api/lecture/scrap/create`,
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
      const response = await axios.patch(`/api/lecture/scrap/delete`,
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
          <img src={scrappedStar} alt="" onClick={lectureUnScrap}/> :
          <img src={unScrappedStar} alt="" onClick={lectureScrap}/>
        }
      </div>
      <div className="lecture-description">
        <div className={setColor(lecture)}>{lecture.childLangTag}</div>
        <div className="lecture-title-box">
          <div className="lecture-name">{lecture.childLectureName}</div>
          <div className="lecture-chapters">({lecture.childChapterNumber}챕터)</div>
        </div>
        <div className="lecture-info">
          <div>
            <img className="lecture-likes-icon" src={lectureLikesIcon} alt="" />
          </div>
          <div className="lecture-likes-number">{lecture.likeNumber}</div>
          <div>
            <img className="lecture-user-number-icon" src={lectureUserNumberIcon} alt="" />
          </div>
          <div className="lecture-likes-number">{lecture.usedCount}</div>
          <div className="lecture-info-vertical-line"></div>
          <div className="lecture-material-type">{lecture.childMaterialType}</div>
          <div className="lecture-price">{lecture.childPricing}</div>
        </div>
      </div>
      <div className="lecture-detail-box">
        <img src={lectureDetailIcon} alt="" />
      </div>
    </div>
  )
}