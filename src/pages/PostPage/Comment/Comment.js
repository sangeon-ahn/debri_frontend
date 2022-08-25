import grayUpThumb from '../../../assets/grayUpThumb.png';
import greenUpThumb from '../../../assets/greenUpThumb.png';
import reCommentIcon from '../../../assets/reComment.png'
import ReComment from '../ReComment/ReComment';
import "./Comment.css";
import commentMenuIcon from "../../../assets/commentMenuIcon.png";
import { getTimeAfterCreated } from '../../../utils/getTimeAfterCreated';
import { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import CommentMenuModal from '../CommentMenuModal/CommentMenuModal';
import CommentReportOtherModal from '../CommentReportOtherModal/CommentReportOtherModal';

export default function Comment(props) {
  const { comment, reComments, setRootCommentIdx, setPlaceHolder, inputRef, handleCommentDelete, setCommentReported, handleReportComment } = props;
  const [isCommentSettingModalOn, setIsCommentSettingModalOn] = useState(false);
  const { userIdx, userName, userId, userBirthday, jwt, refreshToken } = JSON.parse(localStorage.getItem('userData'));
  const headers = {
    'ACCESS-TOKEN': `${JSON.parse(localStorage.getItem("userData")).jwt}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  const [reportedComment, setReportedComment] = useState(comment);
  const [voteCount, setVoteCount] = useState(comment.likeCount);
  const [pressLike, setPressLike] = useState(comment.likeStatus);
  const [loading,setLoading] = useState(false); // 로딩되는지 여부
  const [error,setError] = useState(null); //에러
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const handleRecommentButton = e => {
    setRootCommentIdx(comment.commentIdx);
    setPlaceHolder('대댓글 쓰기');
    inputRef.current.focus();
  };

  //좋아요 생성
  async function createLike(commentIdx) {
    try {
      const response = await axios.post(`${baseUrl}/api/comment/like/create/${commentIdx}`,
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
      const response = await axios.patch(`${baseUrl}/api/comment/like/delete/${commentIdx}`,
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
    setVoteCount(state => {
      if (isNaN(state)) {
        return 1;
      }

      return state + 1;
    });
    setPressLike(true);
    createLike(e);
  }

  function onCancelLike(e) {
    cancelLike(e);
    setVoteCount(voteCount-1);
    setPressLike(false);
  }

  Modal.setAppElement('#root');
  const [commentReportDetailOn, setCommentReportDetailOn] = useState(false);

  const handleReportClick = () => {
    setCommentReportDetailOn(true);
  };

  const handleModalCloseClick = () => {
    setIsCommentSettingModalOn(false);
    setCommentReportDetailOn(false);
  };
  const [commentReportOtherModalOn, setCommentReportOtherModalOn] = useState(false);
  const [reportSnackbarOpen, setReportSnackbarOpen] = useState(false);
  const handleReportOtherClick = () => {
    setCommentReportOtherModalOn(true);
    handleModalCloseClick();
  };
  return (
    <div>
      <CommentMenuModal
        isOpen={isCommentSettingModalOn}
        onRequestClose={() => setIsCommentSettingModalOn(false)}
        reportedComment={reportedComment}
        commentReportDetailOn={commentReportDetailOn}
        handleCommentDelete={handleCommentDelete}
        handleModalCloseClick={handleModalCloseClick}
        handleReportComment={handleReportComment}
        handleReportClick={handleReportClick}
        setReportSnackbarOpen={setReportSnackbarOpen}
        handleReportOtherClick={handleReportOtherClick}
      />
      <CommentReportOtherModal
        isOpen={commentReportOtherModalOn}
        onRequestClose={() => setCommentReportOtherModalOn(false)}
        setReportSnackbarOpen={setReportSnackbarOpen}
        handleReportComment={handleReportComment}
        reportedComment={reportedComment}
      />
      <div className="comment-container">
        <div className="comment-content">
          {comment.commentContent}
        </div>
        <div className="comment-detail">
          <div className="comment-user-name"><span>{comment.authorName} &gt;</span></div>
          <div className="comment-elapsed-time">{getTimeAfterCreated(comment.timeAfterCreated)}</div>
          <div className="comment-button-box">
            {pressLike ?
              <img src={greenUpThumb} alt='' className="green-upthumb-icon" onClick={()=> onCancelLike(comment.commentIdx)} style={{ margin:'-1px 8.49px 1px 0'}}/> :
              <img src={grayUpThumb} alt='' className="gray-upthumb-icon" onClick={()=> onLike(comment.commentIdx)} />
            }
              <div className="up-vote-number">{isNaN(voteCount) ? 0 : voteCount}</div>
              <div className="barrier-line"></div>
              <img src={reCommentIcon} alt='' className="recomment-icon" onClick={handleRecommentButton}/>
              <button className='comment-menu-button' onClick={() => {
                setReportedComment(comment);
                setIsCommentSettingModalOn(state=>!state);
              } }>
                <img src={commentMenuIcon} alt="" className="comment-menu-icon"  />
              </button>
          </div>
        </div>
      </div>

      {reComments.length > 0 &&
        <div className='reComments-container'>
          {reComments.map(reComment =>
            <ReComment key={reComment.commentIdx} reComment={reComment} setIsCommentSettingModalOn={setIsCommentSettingModalOn} setReportedComment={setReportedComment} />
          )}
        </div>}
    </div>
  );
}