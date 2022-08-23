import Modal from 'react-modal';

export default function CommentMenuModal(props) {
  const { isOpen, onRequestClose,reportedComment, handleCommentDelete, handleModalCloseClick, commentReportDetailOn, handleReportComment, handleReportClick, handleReportOtherClick } = props;
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
  const { userIdx, userName, userId, userBirthday, jwt, refreshToken } = JSON.parse(localStorage.getItem('userData'));
  const headers = {
    'ACCESS-TOKEN': jwt,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
Modal.setAppElement('#root');
  return (
    <Modal
          closeTimeoutMS={300}
          isOpen={isOpen}
          onRequestClose={onRequestClose}
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
                  <div className="other" onClick={handleReportOtherClick}>기타 사유</div>
                </div> :
                <button className="post-report-button" onClick={handleReportClick}>
                  신고하기
                </button>}
              </div>
            }
            <button className="post-setting-cancel-container" onClick={handleModalCloseClick}>닫기</button>
          </div>
        </Modal>
  );
}
