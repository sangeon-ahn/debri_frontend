import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import './PostPage.css';
import leftArrow from '../../assets/leftArrow.png';
// import greenUpThumb from '../../assets/greenUpThumb.png';
import postUserProfile from '../../assets/postUserProfile.png';
import userReport from '../../assets/userReport.png';
import searchIcon from '../../assets/searchIcon.png';
import searchIconGreen from '../../assets/searchIconGreen.png';
import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import Comments from "./Comments/Comments";
import WriteComment from "./WriteComment/WriteComment";
import postMenuIcon from "../../assets/postMenuIcon.png";
import Modal from 'react-modal';
import greenHeart from '../../assets/greenHeart.png';
import whiteHeart from '../../assets/whiteHeart.png';
import scrapped from '../../assets/scrapped.png';
import unScrapped from '../../assets/unScrapped.png';
import { getTimeAfterCreated } from "../../utils/getTimeAfterCreated";

export default function PostPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const params = useParams();
  const { boardId, postId } = params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [comments, setComments] = useState([]);
  const [isPostSettingModalOn, setIsPostSettingModalOn] = useState(false);
  const [post, setPost] = useState(null);
  const { userIdx, userName, userId, userBirthday, jwt, refreshToken } = JSON.parse(localStorage.getItem('userData'));
  const [postLikeStatus, setPostLikeStatus] = useState(null);
  const [commentReported, setCommentReported] = useState(0);

  const headers = {
    'ACCESS-TOKEN': `${JSON.parse(localStorage.getItem("userData")).jwt}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  const fetchPost = async (postIdx) => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.get(`/api/post/get/${postIdx}`, { headers });
      setPost(response.data.result);
      console.log(response);
    } catch (e) {
      setError(e);
      console.log(e);
    }
    setLoading(false);
  };

  const fetchComments = async (postIdx) => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.get(`/api/comment/get/${postIdx}`,
        JSON.stringify({}),
        { headers });
      if (response.data.isSuccess) {
        console.log(1, response.data.result);
        setComments(response.data.result);
      }
      console.log(response);
    } catch (e) {
      setError(e);
      console.log(e);
    }
    setLoading(false);
  };

  const [postLikes, setPostLikes] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchPost(postId);
    fetchComments(postId);
    // window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', clickModalOutside);

    return () => {
      document.addEventListener('mousedown', clickModalOutside);
    }
  }, []);

  useEffect(() => {
    if (!post) {
      return;
    }
    console.log(post);
    if (post.userLike) {
      console.log('2', post.likeNumber);
      setPostLikes(post.likeNumber);
      setPostLikeStatus(true);
    } else if (!post.userLike) {
      console.log(3);
      setPostLikeStatus(false);
    }

    if (post.userScrap) {
      console.log(4);
      setPostScrapStatus(true);
    } else if (!post.userScrap) {
      console.log(5);
      setPostScrapStatus(false);
    }
  }, [post]);

  useEffect(() => {
    if (postLikeStatus !== null && count !== 0) {
      if (postLikeStatus) {
        setPostLikes(state => state + 1);
      } else {
        setPostLikes(state => state - 1);
    }
    }
  }, [postLikeStatus]);

  useEffect(() => {
    if (commentReported === 0) return;
    fetchComments(postId);
  }, [commentReported]);

  const clickModalOutside = e => {
    if (e.target.className === "ReactModal__Overlay ReactModal__Overlay--after-open") {
      setPostReportDetailOn(false);
    }
  };

  const handleCommentDelete = async (e, commentIdx) => {
    const deletePost = async (commentIdx) => {
      try {
        const response = await axios.patch(`/api/comment/delete/${commentIdx}`,
          JSON.stringify({}),
          { headers }
        );
        console.log(response.data);
        if (response.data.isSuccess) {
          setComments(state => state.filter(comment => comment.commentIdx !== commentIdx));
        }
      } catch (error) {
        console.log(error);
      }
    };
    deletePost(commentIdx);
  };

  const handleReportComment = (e, commentIdx) => {
    const reportComment = async (commentIdx, reason) => {
      try {
        const response = await axios.post(`/api/report/commentReport`,
          JSON.stringify({
            commentIdx: parseInt(commentIdx),
            reason: reason
          }),
          { headers });
          console.log(response);
          if (response.data.isSuccess) {
            setComments(state => state.filter(comment => comment.commentIdx !== commentIdx));
          }
      } catch (error) {
        console.log(error);
      }
    };
    console.log(parseInt(commentIdx), e.target.innerText);
    reportComment(parseInt(commentIdx), e.target.innerText);
  };


  const handleEnterInput = (e, content, authorName) => {
    const uploadComment = async (userIdx, postIdx, content, authorName) => {
      try {
        const response = await axios.post(`/api/comment/replyOnPost/create`,
          JSON.stringify(
            {
              userIdx: userIdx,
              postIdx: postIdx,
              content: content,
              authorName: authorName
            }),
            { headers }
        );

        console.log(response.data.result);
        setComments(state => {
          return [
            ...state,
            response.data.result
          ];
        });

      } catch (e) {
        console.log(e);
        setError(e);
      }
    };

    const uploadReComment = async (userIdx, postIdx, rootCommentIdx, content, authorName) => {
      try {
        const response = await axios.post(`/api/comment/replyOnReply/create`,
          JSON.stringify(
            {
              userIdx,
              postIdx,
              rootCommentIdx,
              content,
              authorName
            }),
            { headers }
        );

        console.log(response.data.result);
        setComments(state => {
          return [
            ...state,
            response.data.result
          ];
        });
      } catch (e) {
        console.log(e);
        setError(e);
      }
    };

    if (rootCommentIdx === null) {
      uploadComment(userIdx, postId, content, authorName);
    } else {
      uploadReComment(userIdx, postId, rootCommentIdx, content, authorName);
    }
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

  const postLike = async (userIdx, postIdx, likeStatus) => {
    try {
      const response = await axios.post(`/api/post/like`,
        {
          postIdx: postIdx,
          userIdx: userIdx,
          likeStatus: likeStatus
        },
        { headers }
        );
      console.log(response);
      setCount(state => state + 1);
      setPostLikeStatus(true);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  const postCancelLike = useCallback(async (userIdx, postIdx) => {
    try {
      const response = await axios.patch('/api/post/like/cancel',
        {
          postIdx: postIdx,
          userIdx: userIdx
        },
        { headers }
        );
        console.log(response);
        setPostLikeStatus(false);
        setCount(state => state + 1);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  }, [headers]);

  const postCancelScrap = async (postIdx) => {
    try {
      const response = await axios.post(`/api/post/unscrap/${postIdx}`,
        JSON.stringify({}),
        { headers }
        );
        console.log(response);
        setPostScrapStatus(false);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  const postScrap = async (postIdx) => {
    console.log(postIdx);
    try {
      const response = await axios.post(`/api/post/scrap/${postIdx}`,
        JSON.stringify({}),
        { headers }
        );
        console.log(response);
        setPostScrapStatus(true);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  const [postReportDetailOn, setPostReportDetailOn] = useState(false);

  const handleReportClick = () => {
    setPostReportDetailOn(true);
  };

  const handleModalCloseClick = () => {
    setIsPostSettingModalOn(false);
    setPostReportDetailOn(false);
  };

  const reportSettingModal = useRef();

  const [rootCommentIdx, setRootCommentIdx] = useState(null);
  const [placeHolder, setPlaceHolder] = useState('댓글쓰기');
  const [inputRef, setInputRef] = useState(null);

  const handleReportPost = (e) => {
    const reportPost = async (postIdx, reason) => {
      try {
        const response = await axios.post(`/api/report/postReport`,
          JSON.stringify({
            postIdx: postIdx,
            reason: reason
          }),
          { headers });
          console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    // console.log(parseInt(postId), e.target.innerText);
    reportPost(parseInt(postId), e.target.innerText);
    handleModalCloseClick();
    navigate(`/boards/${boardId}`);
  };

  const [postScrapStatus, setPostScrapStatus] = useState(null);

  return (
    <>
      <Header />

      <div className="post-container">
        <div className='board-title-box'>
          <button className='back-button' onClick={() => navigate(`/boards/${boardId}`)}>
            <img src={leftArrow} alt=''/>
          </button>
          <div className='board-title'>{state.boardName}</div>
        </div>
        {(!loading && !error && post) && <><Modal
          closeTimeoutMS={300}
          isOpen={isPostSettingModalOn}
          onRequestClose={() => setIsPostSettingModalOn(state => !state)}
          style={customStyles}
          contentLabel="Example Modal"
        >
         <div className="post-setting-container">
            {Number(userIdx) === post.authorIdx ?
              <div className="post-setting-menu-container">
                <div className="post-setting-modal-title">게시물 관리</div>
                <button className="post-modify" onClick={() => navigate(`/boards/${boardId}/${postId}/modify`, {state: {post: post, boardName: state.boardName}})}>수정하기</button>
                <button className="post-delete" onClick={() => {
                  handlePostDeleteClick(postId);
                  navigate(`/boards/${boardId}`);
                }}>삭제하기</button>
              </div> :
              <div>
                {postReportDetailOn ?
                <div className="post-report-detail" ref={reportSettingModal}>
                  <div className="post-setting-modal-title">게시물 관리</div>
                  <div className="ad-spam-report" onClick={handleReportPost}>상업적 광고 / 스팸 게시물</div>
                  <div className="fish" onClick={handleReportPost}>낚시 / 도배 게시물</div>
                  <div className="irrelevant" onClick={handleReportPost}>개발과 무관한 게시물</div>
                  <div className="hate" onClick={handleReportPost}>욕설 / 비하를 포함한 게시물</div>
                  <div className="other" onClick={handleReportPost}>기타 사유</div>
                </div> :
                <button className="post-report-button" onClick={handleReportClick}>
                  신고하기
                </button>}
              </div>
            }
            <button className="post-setting-cancel-container" onClick={handleModalCloseClick}>닫기</button>
          </div>
        </Modal>
        <div className="post-subject">
          <div className="post-title-container">
            <div className="post-title-wrapper">
              <div className="post-title-box">{post.postName}</div>
              <div className="post-comment-number">({post.commentNumber})</div>
              <button className="post-menu-button" onClick={() => setIsPostSettingModalOn(state=>!state)}>
                <img className="post-menu-icon" src={postMenuIcon} alt=""/>
              </button>
            </div>
            <div className="post-elapsed-time">{getTimeAfterCreated(post.timeAfterCreated)}</div>
          </div>
          <div className="post-user-info">
            <div className="post-user-profile">
              <img src={postUserProfile} alt="엑박" />
            </div>
            <div className="post-user-nickname">{post.authorName} ></div>
          </div>
        </div>
        {/* <div className="report-user-box">
          <div className="report-icon-box">
            <img src={userReport} alt='엑박' />
          </div>
          <div className="post-report-text">신고하기</div>
        </div> */}
        <div className="post-main-content">{post.contents}</div>
        <div className="post-button-container">
          {postLikeStatus ?
          <>
            <button className='like-status-button' onClick={() => postCancelLike(userIdx, postId)}>
              <div className="liked-inpost-like-number">{postLikes}</div>
              <img src={greenHeart} alt=""/>
              추천
            </button>
          </> :
          <>
            <button className='default-status-button' onClick={() => postLike(userIdx, postId, "LIKE")}>
              <div className="default-inpost-like-number">{postLikes}</div>
              <img src={whiteHeart} alt="" />
              <div>추천</div>
            </button>
          </>
          }
          {postScrapStatus ?
          <>
            <button className='scrap-status-button' onClick={() => {setPostScrapStatus(false); postCancelScrap(postId)}}>
              <img src={scrapped} alt=""/>
              <div>스크랩</div>
            </button>
          </> :
          <>
            <button className='default-status-scrap-button' onClick={() => {setPostScrapStatus(true); postScrap(postId)}}>
              <img src={unScrapped} alt="" />
              <div>스크랩</div>
            </button>
          </>
          }
        </div>
        {comments && <Comments comments={comments} setRootCommentIdx={setRootCommentIdx} setPlaceHolder={setPlaceHolder} inputRef={inputRef} handleCommentDelete={handleCommentDelete} setCommentReported={setCommentReported} handleReportComment={handleReportComment} />}</>}
        
      </div>
        <WriteComment
          handleEnterInput={handleEnterInput}
          authorName={userName}
          rootCommentIdx={rootCommentIdx}
          placeHolder={placeHolder}
          setInputRef={setInputRef}
          setPlaceHolder={setPlaceHolder}
          setRootCommentIdx={setRootCommentIdx}
        />
       <div style={{position:"fixed", zIndex: 1, width: '360px', height: '100px', backgroundColor: '#0A1123', bottom: '10px'}} ></div>
    </>
  );
}
