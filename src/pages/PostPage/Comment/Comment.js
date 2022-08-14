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

  const handleRecommentButton = e => {
    setRootCommentIdx(comment.commentIdx);
    setPlaceHolder('대댓글 쓰기');
    inputRef.current.focus();
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

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px',
      position: 'absolute',
      WebkitOverflowScrolling: 'touch',
      outline: 'none',
      width: '316px',
      backgroundColor:'transparent',
      border: 'none'
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      bottom: 0,
      left: 0,
      position: "fixed",
      right: 0,
      top: 0,
      zIndex: 99
    }
  };

  Modal.setAppElement('#root');
  // Modal.defaultStyles.overlay = {
  //   backgroundColor: "rgba(0, 0, 0, 0.6)",
  //   bottom: 0,
  //   left: 0,
  //   position: "fixed",
  //   right: 0,
  //   top: 0,
  //   zIndex: 99
  // }
  // Modal.defaultStyles.content = {
  //   position: 'absolute',
  //   top: '40px',
  //   left: '40px',
  //   right: '40px',
  //   bottom: '40px',
  //   WebkitOverflowScrolling: 'touch',
  //   outline: 'none',
  //   width: '316px',
  //   backgroundColor: '#D9D9D9',
  //   borderRadius: '10px',
  // }
  console.log(comment);

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
    // setIsPostSettingModalOn(false);
    handleModalCloseClick();
  };
  return (
    <div>
      {/* <Modal
          closeTimeoutMS={300}
          isOpen={isCommentSettingModalOn}
          onRequestClose={() => setIsCommentSettingModalOn(state => !state)}
          style={customStyles}
          contentLabel="Example Modal"
        >
         <div className="post-setting-container">
            {Number(userIdx) === reportedComment.authorIdx ?
              <div className="post-setting-menu-container">
                <div className="post-setting-modal-title">댓글 관리</div>
                <button className="post-modify">수정하기</button>
                <button className="post-delete" onClick={(e) => {
                  console.log(reportedComment.commentIdx);
                  handleCommentDelete(e, reportedComment.commentIdx);
                  handleModalCloseClick();
                }}>삭제하기</button>
              </div> :
              <div>
                {commentReportDetailOn ?
                <div className="post-report-detail">
                  <div className="post-setting-modal-title">게시물 관리</div>
                  <div className="ad-spam-report" onClick={(e) => {
                    handleModalCloseClick();
                    handleReportComment(e, reportedComment.commentIdx);
                  }}>상업적 광고 / 스팸 게시물</div>
                  <div className="fish" onClick={(e) => {
                    handleModalCloseClick();
                    handleReportComment(e, reportedComment.commentIdx);
                  }}>낚시 / 도배 게시물</div>
                  <div className="irrelevant" onClick={(e) => {
                    handleModalCloseClick();
                    handleReportComment(e, reportedComment.commentIdx);
                  }}>개발과 무관한 게시물</div>
                  <div className="hate" onClick={(e) => {
                    handleModalCloseClick();
                    handleReportComment(e, reportedComment.commentIdx);
                  }}>욕설 / 비하를 포함한 게시물</div>
                  <div className="other" onClick={(e) => {
                    handleModalCloseClick();
                    handleReportComment(e, reportedComment.commentIdx);
                  }}>기타 사유</div>
                </div> :
                <button className="post-report-button" onClick={handleReportClick}>
                  신고하기
                </button>}
              </div>
            }
            <button className="post-setting-cancel-container" onClick={handleModalCloseClick}>닫기</button>
          </div>
        </Modal> */}
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
              <div className="up-vote-number">{voteCount}</div>
              <div className="barrier-line"></div>
              <img src={reCommentIcon} alt='' className="recomment-icon" onClick={handleRecommentButton}/>
              <button className='comment-menu-button' onClick={() => setIsCommentSettingModalOn(state=>!state)}>
                <img src={commentMenuIcon} alt="" className="comment-menu-icon"  />
                j
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