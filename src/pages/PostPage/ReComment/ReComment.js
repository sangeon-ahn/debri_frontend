import recommentArrow from '../../../assets/recommentArrow.png';
import recommentMenuIcon from "../../../assets/commentMenuIcon.png";
import grayUpThumb from '../../../assets/grayUpThumb.png';
import greenUpThumb from '../../../assets/greenUpThumb.png';
import { useState } from 'react';
import axios from 'axios';

import './ReComment.css';

export default function ReComment(props) {
  const { reComment, setIsCommentSettingModalOn, setReportedComment } = props;
  const [voteCount, setVoteCount] = useState(reComment.likeCount);
  const [pressLike, setPressLike] = useState(reComment.likeStatus);
  const [loading,setLoading] = useState(false); // 로딩되는지 여부
  const [error,setError] = useState(null); //에러
  const headers = {
    'ACCESS-TOKEN': `${JSON.parse(localStorage.getItem("userData")).jwt}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  //좋아요 생성
  async function createLike(commentIdx) {
    try {
      const response = await axios.post(`/api/comment/like/create/${commentIdx}`,
        JSON.stringify({}),
        { headers }
      );
      console.log('좋아요 생성', response);
    } catch (error) {
      console.error(error);
    }
  }

  //좋아요 취소
  async function cancelLike(commentIdx) {
    try {
      const response = await axios.patch(`/api/comment/like/delete/${commentIdx}`,
        JSON.stringify({}),
        { headers }
      );
      console.log('좋아요 취소', response);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }

  function onLike(e) {
    createLike(e);
    setVoteCount(voteCount+1);
    setPressLike(true);
  }

  function onCancelLike(e) {
    cancelLike(e);
    setVoteCount(voteCount-1);
    setPressLike(false);
  }

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
          {pressLike ? 
              <img src={greenUpThumb} alt='' className="green-upthumb-icon" onClick={()=> onCancelLike(reComment.commentIdx)} style={{ margin:'-1px 8.49px 1px 0'}}/> :
              <img src={grayUpThumb} alt='' className="gray-upthumb-icon" onClick={()=> onLike(reComment.commentIdx)} />
            }   
            <div className="up-vote-number">{voteCount}</div>
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