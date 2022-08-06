import "./Lecture.css";
import unScrapStar from "../../../assets/emptyStar.png";
import lectureLikesIcon from '../../../assets/lectureLikesIcon.png';
import lectureUserNumberIcon from '../../../assets/curriUserNumberIcon.png';
import lectureDetailIcon from '../../../assets/lectureDetailIcon.png';

export default function Lecture(props) {
  const { lecture } = props;

  return (
    <div className="lecture">
            <div className="lecture-scrap-box">
              <img src={unScrapStar} alt="" />
            </div>
            <div className="lecture-description">
              <div className="lecture-subject">{lecture.langTag}</div>
              <div className="lecture-title-box">
                <div className="lecture-name">{lecture.lectureName}</div>
                <div className="lecture-chapters">({lecture.chapterNumber}챕터)</div>
              </div>
              <div className="lecture-info">
                <div>
                  <img className="lecture-likes-icon" src={lectureLikesIcon} alt="" />
                </div>
                <div className="lecture-likes-number">103</div>
                <div>
                  <img className="lecture-user-number-icon" src={lectureUserNumberIcon} alt="" />
                </div>
                <div className="lecture-likes-number">84</div>
                <div className="lecture-info-vertical-line"></div>
                <div className="lecture-material-type">{lecture.materialType}</div>
                <div className="lecture-price">{lecture.pricing}</div>
              </div>
            </div>
            <div className="lecture-detail-box">
              <img src={lectureDetailIcon} alt="" />
            </div>
          </div>
  )
}