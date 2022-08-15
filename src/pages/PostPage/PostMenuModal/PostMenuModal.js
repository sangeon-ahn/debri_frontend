import Modal from 'react-modal';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function PostMenuModal(props) {
  const { isOpen, onRequestClose, post, postReportDetailOn, handleReportPost, handleReportOtherClick, handleReportClick, handleModalCloseClick, setReportSnackbarOpen } = props;
  const params = useParams();
  const { boardId, postId } = params;
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { userIdx, userName, userId, userBirthday, jwt, refreshToken } = JSON.parse(localStorage.getItem('userData'));
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

  const headers = {
    'ACCESS-TOKEN': jwt,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const scrapped = searchParams.get('scrapped');

  const handlePostDeleteClick = async (postId) => {
    const deletePost = async (postId) => {
      try {
        const response = await axios.patch(`/api/post/${postId}/status`,
          JSON.stringify({}),
          { headers }
        );
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    deletePost(postId);
  };

  return (
    <Modal
      closeTimeoutMS={300}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
    <div className="post-setting-container">
      {Number(userIdx) === post.authorIdx ?
        <div className="post-setting-menu-container">
          <div className="post-setting-modal-title">게시물 관리</div>
          <button className="post-modify" onClick={() => navigate(`/boards/${boardId}/${postId}/modify?scrapped=${scrapped}`, {state: {post: post, boardName: state.boardName}})}>수정하기</button>
          <button className="post-delete" onClick={() => {
            handlePostDeleteClick(postId);
            navigate(`/boards/${boardId}?scrapped=${scrapped}`);
          }}>삭제하기</button>
        </div> :
        <div>
          {postReportDetailOn ?
          <div className="post-report-detail">
            <div className="post-setting-modal-title">게시물 관리</div>
            <div className="ad-spam-report" onClick={handleReportPost}>상업적 광고 / 스팸 게시물</div>
            <div className="fish" onClick={handleReportPost}>낚시 / 도배 게시물</div>
            <div className="irrelevant" onClick={handleReportPost}>개발과 무관한 게시물</div>
            <div className="hate" onClick={handleReportPost}>욕설 / 비하를 포함한 게시물</div>
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
  )
}