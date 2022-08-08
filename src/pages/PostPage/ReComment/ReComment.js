import recommentArrow from '../../../assets/recommentArrow.png';
import recommentMenuIcon from "../../../assets/commentMenuIcon.png";
import grayUpThumb from '../../../assets/grayUpThumb.png';

import './ReComment.css';

export default function ReComment(props) {
  const { reComment, setIsCommentSettingModalOn, setReportedComment } = props;

  const handleRecommentMenuButtonClick = () => {
    setReportedComment(reComment);
    setIsCommentSettingModalOn(state => !state);
  };

  return (
    <div className="recomment-container">
      <div className="recomment-arrow-box">
        <img src={recommentArrow} alt='' className="recomment-arrow" />
      </div>
      <div className="recomment-main">
        <div className="recomment-content">{reComment.commentContent}</div>
        <div className='recomment-detail'>
          <div className="recomment-user-name">{reComment.authorName} &gt;</div>
          <div className='recomment-elapsed-time'>0분 전</div>
          <div className='recomment-button-box'>
            <img src={grayUpThumb} alt='' className="gray-upthumb-icon" />
            <div className='up-vote-number'>0</div>
            <div className='barrier-line'></div>
            <button className='recomment-menu-button' onClick={handleRecommentMenuButtonClick}>
              <img src={recommentMenuIcon} alt="" className="recomment-menu-icon"  />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}