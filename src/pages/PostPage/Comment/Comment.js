import grayUpThumb from '../../../assets/grayUpThumb.png';
import reCommentIcon from '../../../assets/reComment.png'
import ReComment from '../ReComment/ReComment';
import "./Comment.css";

export default function Comment(props) {
  const { comment, reComments, setRootCommentIdx, setPlaceHolder, inputRef } = props;
  const handleRecommentButton = e => {
    setRootCommentIdx(comment.commentIdx);
    setPlaceHolder('대댓글 쓰기');
    inputRef.current.focus();
  };

  return (
    <div>
      <div className="comment-container">
        <div className="comment-content">
          {comment.commentContent}
        </div>
        <div className="comment-detail">
          <div className="comment-user-name"><span>{comment.authorName} ></span></div>
          <div className="comment-elapsed-time">5분 전</div>
          <div className="comment-button-box">
              <img src={grayUpThumb} alt='' className="gray-upthumb-icon" />
            <div className="up-vote-number">0</div>
            <div className="barrier-line"></div>
              <img src={reCommentIcon} alt='' className="recomment-icon" onClick={handleRecommentButton}/>
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