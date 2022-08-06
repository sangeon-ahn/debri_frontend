import grayUpThumb from '../../../assets/grayUpThumb.png';
import reCommentIcon from '../../../assets/reComment.png'
import ReComment from '../ReComment/ReComment';
import "./Comment.css";
import commentMenuIcon from "../../../assets/commentMenuIcon.png";
import { getTimeAfterCreated } from '../../../utils/getTimeAfterCreated';
import { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

export default function Comment(props) {
  const { comment, reComments, setRootCommentIdx, setPlaceHolder, inputRef, handleCommentDelete } = props;
  const [isCommentSettingModalOn, setIsCommentSettingModalOn] = useState(false);
  const { userIdx, userName, userId, userBirthday, jwt, refreshToken } = JSON.parse(localStorage.getItem('userData'));
  const headers = {
    'ACCESS-TOKEN': jwt,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  const handleRecommentButton = e => {
    setRootCommentIdx(comment.commentIdx);
    setPlaceHolder('대댓글 쓰기');
    inputRef.current.focus();
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  Modal.setAppElement('#root');
  Modal.defaultStyles.overlay = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    bottom: 0,
    left: 0,
    position: "fixed",
    right: 0,
    top: 0,
    zIndex: 99
  }
  Modal.defaultStyles.content = {
    position: 'absolute',
    top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px',
    WebkitOverflowScrolling: 'touch',
    outline: 'none',
    width: '316px',
    backgroundColor: '#D9D9D9',
    borderRadius: '10px',
  }
  console.log(comment);

  const [commentReportDetailOn, setCommentReportDetailOn] = useState(false);

  const handleReportClick = () => {
    setCommentReportDetailOn(true);
  };

  const handleModalCloseClick = () => {
    setIsCommentSettingModalOn(false);
    setCommentReportDetailOn(false);
  };

  const handleReportComment = (e) => {
    const reportComment = async (commentIdx, reason) => {
      try {
        const response = await axios.post(`/api/report/commentReport`,
          JSON.stringify({
            postIdx: commentIdx,
            reason: reason
          }),
          { headers });
          console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    console.log(parseInt(comment.commentIdx), e.target.innerText);
    reportComment(parseInt(comment.commentIdx), e.target.innerText);
    handleModalCloseClick();
  };

  return (
    <div>
      <Modal
          closeTimeoutMS={300}
          isOpen={isCommentSettingModalOn}
          onRequestClose={() => setIsCommentSettingModalOn(state => !state)}
          style={customStyles}
          contentLabel="Example Modal"
        >
         <div className="post-setting-container">
            {Number(userIdx) === comment.authorIdx ?
              <div className="post-setting-menu-container">
                <div className="post-setting-modal-title">댓글 관리</div>
                <button className="post-modify">수정하기</button>
                <button className="post-delete" onClick={(e) => {
                  console.log(comment.commentIdx);
                  handleCommentDelete(e, comment.commentIdx);
                  handleModalCloseClick();
                }}>삭제하기</button>
              </div> :
              <div>
                {commentReportDetailOn ?
                <div className="post-report-detail">
                  <div className="post-setting-modal-title">게시물 관리</div>
                  <div className="ad-spam-report" onClick={handleReportComment}>상업적 광고 / 스팸 게시물</div>
                  <div className="fish" onClick={handleReportComment}>낚시 / 도배 게시물</div>
                  <div className="irrelevant" onClick={handleReportComment}>개발과 무관한 게시물</div>
                  <div className="hate" onClick={handleReportComment}>욕설 / 비하를 포함한 게시물</div>
                  <div className="other" onClick={handleReportComment}>기타 사유</div>
                </div> :
                <button className="post-report-button" onClick={handleReportClick}>
                  신고하기
                </button>}
              </div>
            }
            <button className="post-setting-cancel-container" onClick={handleModalCloseClick}>닫기</button>
          </div>
        </Modal>
      <div className="comment-container">
        <div className="comment-content">
          {comment.commentContent}
        </div>
        <div className="comment-detail">
          <div className="comment-user-name"><span>{comment.authorName} ></span></div>
          <div className="comment-elapsed-time">{getTimeAfterCreated(comment.timeAfterCreated)}</div>
          <div className="comment-button-box">
              <img src={grayUpThumb} alt='' className="gray-upthumb-icon" />
              <div className="up-vote-number">0</div>
              <div className="barrier-line"></div>
              <img src={reCommentIcon} alt='' className="recomment-icon" onClick={handleRecommentButton}/>
              <img src={commentMenuIcon} alt="" className="comment-menu-icon" onClick={() => setIsCommentSettingModalOn(state=>!state)} />
          </div>
        </div>
      </div>

      {reComments.length > 0 &&
        <div className='reComments-container'>
          {reComments.map(reComment =>
            <ReComment key={reComment.commentIdx} reComment={reComment} />
          )}
        </div>}
    </div>
  );
}