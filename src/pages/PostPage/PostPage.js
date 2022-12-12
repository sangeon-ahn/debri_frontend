import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Header from "../Header/Header";
import './PostPage.css';
import leftArrow from '../../assets/leftArrow.png';
// import greenUpThumb from '../../assets/greenUpThumb.png';
import postUserProfile from '../../assets/postUserProfile.png';
import pagePrev from '../../assets/pagePrev.png';
import pageNext from '../../assets/pageNext.png';
import userReport from '../../assets/userReport.png';
import searchIcon from '../../assets/searchIcon.png';
import searchIconGreen from '../../assets/searchIconGreen.png';
import { useEffect, useRef, useState, useCallback, useLayoutEffect } from "react";
import axios from "axios";
import Comments from "./Comments/Comments";
import WriteComment from "./WriteComment/WriteComment";
import postMenuIcon from "../../assets/postMenuIcon.png";
import greenHeart from '../../assets/greenHeart.png';
import whiteHeart from '../../assets/whiteHeart.png';
import scrappedIcon from '../../assets/scrapped.png';
import unScrappedIcon from '../../assets/unScrapped.png';
import { getTimeAfterCreated } from "../../utils/getTimeAfterCreated";
import { PostScrapSnackbar } from "./PostScrapSnackbar/PostScrapSnackbar";
import PostReportOtherModal from "./PostReportOtherModal/PostReportOtherModal";
import PostMenuModal from "./PostMenuModal/PostMenuModal";
import PostReportSnackbar from "./PostReportSnackbar/PostReportSnackbar";
import UserBlockModal from "./UserBlockModal/UserBlockModal";
import { refreshAccessToken } from "../../utils/refreshAccessToken";

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
  const [pureStatus, setPureStatus] = useState(true);
  const [postLikes, setPostLikes] = useState(0);
  const [rootCommentIdx, setRootCommentIdx] = useState(null);
  const [placeHolder, setPlaceHolder] = useState('댓글쓰기');
  const [inputRef, setInputRef] = useState(null);
  const [scrapSnackbarOpen, setScrapSnackbarOpen] = useState(false);
  const [reportSnackbarOpen, setReportSnackbarOpen] = useState(false);
  const [postScrapStatus, setPostScrapStatus] = useState(null);
  const [postReportDetailOn, setPostReportDetailOn] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const scrapped = searchParams.get('scrapped');
  const [page, setpage] = useState(1);
  const [pageFive, setPageFive] = useState(0);
  const [commentCnt, setCommentCnt] = useState(0);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const headers = {
    'ACCESS-TOKEN': `${JSON.parse(localStorage.getItem("userData")).jwt}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  console.log(location);
  useEffect(() => {
      fetchPost(postId);
      fetchComments(postId, page);
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
      setPostLikeStatus(false);
    }

    if (post.userScrap) {
      setPostScrapStatus(true);
    } else if (!post.userScrap) {
      setPostScrapStatus(false);
    }
  }, [post]);

  useEffect(() => {
    if (postLikeStatus !== null && !pureStatus) {
      if (postLikeStatus) {
        setPostLikes(state => state + 1);
      } else {
        setPostLikes(state => state - 1);
    }
    }
  }, [postLikeStatus, pureStatus]);

  useEffect(() => {
    if (commentReported === 0) return;
    fetchComments(postId);
  }, [commentReported]);

  // useEffect(() => {
  //   if (comments === []) return;
  //   const $postScrollPart = document.querySelector('.post-scroll-part');
  //   $postScrollPart.scrollHeight = $postScrollPart.clientHeight + $postScrollPart.scrollTop;
  // }, [comments]);

  const fetchPost = async (postIdx) => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.get(`${baseUrl}/api/post/get/${postIdx}`, { headers });
      setPost(response.data.result);
      console.log(response);
    } catch (e) {
      setError(e);
      console.log(e);
    }
    setLoading(false);
  };

  const fetchComments = async (postIdx, pageNum) => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.get(`${baseUrl}/api/comment/get/${postIdx}?pageNum=${pageNum}`,{ headers });
      if (response.data.isSuccess) {
        console.log('댓글', response.data.result.commentList);
        setComments(response.data.result.commentList);
        setCommentCnt(response.data.result.commentCount)
      }
      console.log('댓글실패', response);
    } catch (e) {
      setError(e);
      console.log(e);
    }
    setLoading(false);
  };

  //페이지네이션
  const totalpage = Math.ceil(commentCnt/12)
  const pageGoPrev = () => {
    console.log('현재페이지', pageFive)
    setPageFive(pageFive-1)
  };
  const pageGoNext = () => {
    console.log('현재페이지', pageFive)
    setPageFive(pageFive+1)
  };

  const handlePageChange = (e) => {
    console.log(e)
    setpage(e);
    fetchComments(postId, e);
  };
  //

  const clickModalOutside = e => {
    if (e.target.className === "ReactModal__Overlay ReactModal__Overlay--after-open") {
      setPostReportDetailOn(false);
    }
  };

  const handleCommentDelete = async (e, commentIdx) => {
    const deletePost = async (commentIdx) => {
      try {
        const response = await axios.patch(`${baseUrl}/api/comment/delete/${commentIdx}`,
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

  const handleReportComment = (e, commentIdx, reason) => {
    const reportComment = async (commentIdx, reason) => {
      try {
        const response = await axios.post(`${baseUrl}/api/report/commentReport`,
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
    if (e.target.innerText !== '네') {
      reportComment(parseInt(commentIdx), e.target.innerText);
    } else {
      reportComment(parseInt(commentIdx), reason);
    }
    setReportSnackbarOpen(true);
  };

  const handleEnterInput = (e, content, authorName) => {
    const uploadComment = async (userIdx, postIdx, content, authorName) => {
      try {
        const response = await axios.post(`${baseUrl}/api/comment/replyOnPost/create`,
          JSON.stringify(
            {
              userIdx: userIdx,
              postIdx: postIdx,
              content: content,
              authorName: authorName
            }),
            { headers }
        );

        console.log('댓작성완', response);
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
      const $postScrollPart = document.querySelector('.post-scroll-part');
      $postScrollPart.scrollTop = $postScrollPart.scrollHeight ;
    };

    const uploadReComment = async (userIdx, postIdx, rootCommentIdx, content, authorName) => {
      try {
        const response = await axios.post(`${baseUrl}/api/comment/replyOnReply/create`,
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
      console.log('댓글작성')
      uploadComment(userIdx, postId, content, authorName);
    } else {
      uploadReComment(userIdx, postId, rootCommentIdx, content, authorName);
    }
  };

  const handleReportClick = () => {
    setPostReportDetailOn(true);
  };

  const handleModalCloseClick = () => {
    setIsPostSettingModalOn(false);
  };

  useLayoutEffect(() => {
    if (isPostSettingModalOn) {
      setPostReportDetailOn(false);
    }

  }, [isPostSettingModalOn]);

  const handleReportPost = (e) => {
    const reportPost = async (postIdx, reason) => {
      try {
        const response = await axios.post(`${baseUrl}/api/report/postReport`,
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
    reportPost(parseInt(postId), e.target.innerText);
    setIsPostSettingModalOn(false);
    // setReportSnackbarOpen(true);
    setUserBlockOpen(true);
  };

  const handleScrapSnackbarClose = (e, reason) => {
    if (reason === 'clickway') {
      return;
    }

    setScrapSnackbarOpen(false);
  };

  const handleReportSnackbarClose = (e, reason) => {
    if (reason === 'clickway') {
      return;
    }

    setReportSnackbarOpen(false);
  };

  const postLike = async (userIdx, postIdx, likeStatus) => {
    try {
      const response = await axios.post(`${baseUrl}/api/post/like`,
        {
          postIdx: postIdx,
          userIdx: userIdx,
          likeStatus: likeStatus
        },
        { headers }
        );
      console.log(response);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  const postCancelLike = async (userIdx, postIdx) => {
    try {
      const response = await axios.patch(`${baseUrl}/api/post/like/cancel`,
        {
          postIdx: postIdx,
          userIdx: userIdx
        },
        { headers }
        );
        console.log(response);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  const postCancelScrap = async (postIdx) => {
    try {
      const response = await axios.post(`${baseUrl}/api/post/unscrap/${postIdx}`,
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
      const response = await axios.post(`${baseUrl}/api/post/scrap/${postIdx}`,
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
  const [postReportOtherModalOn, setPostReportOtherModalOn] = useState(false);
  const handleReportOtherClick = () => {
    setPostReportOtherModalOn(true);
    // setIsPostSettingModalOn(false);
    handleModalCloseClick();
  };

  const [userBlockOpen, setUserBlockOpen] = useState(false);
  
  return (
    <>
      <Header />

      <div className="post-container">
        <div className='board-title-box2'>
          <button className='back-button' onClick={() => navigate(`/boards/${boardId}?scrapped=${scrapped}`)}>
            <img src={leftArrow} alt=''/>
          </button>
          <div className='board-title'>{state.boardName}</div>
        </div>
        {(!loading && !error && post) &&
          <>
            <PostMenuModal
              isOpen={isPostSettingModalOn}
              onRequestClose={handleModalCloseClick}
              post={post}
              postReportDetailOn={postReportDetailOn}
              handleReportPost={handleReportPost}
              handleReportOtherClick={handleReportOtherClick}
              handleReportClick={handleReportClick}
              handleModalCloseClick={handleModalCloseClick}
              setReportSnackbarOpen={setReportSnackbarOpen}
              setUserBlockOpen={setUserBlockOpen}
            />
            <PostReportOtherModal
              isOpen={postReportOtherModalOn}
              onRequestClose={() => setPostReportOtherModalOn(false)}
              setReportSnackbarOpen={setReportSnackbarOpen}
              setUserBlockOpen={setUserBlockOpen}
            />
            <UserBlockModal 
              isOpen={userBlockOpen}
              onRequestClose={() => setUserBlockOpen(false)}
              setReportSnackbarOpen={setReportSnackbarOpen}
            />
            <div className="post-scroll-part">
              <div className="post-subject">
              <div className="post-title-container">
                <div className="post-title-wrapper">
                  <div className="post-title-box">{post.postName}</div>
                  <div className="post-comment-number">({comments.length})</div>
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
                <div className="post-user-nickname">{post.authorName} &gt;</div>
              </div>
              </div>
              <div className="post-main-content">{post.contents}</div>
              <div className="post-button-container">
                {postLikeStatus ?
                  <>
                    <button className='like-status-button' onClick={() => {
                      setPostLikeStatus(false);
                      setPureStatus(false);
                      postCancelLike(userIdx, postId);
                    }}>
                    <div className="liked-inpost-like-number">{postLikes}</div>
                    <img src={greenHeart} alt=""/>
                    추천
                    </button>
                  </>
                  :
                  <>
                    <button className='default-status-button' onClick={() => {
                      setPostLikeStatus(true);
                      setPureStatus(false);
                      postLike(userIdx, postId, "LIKE");
                    }}>
                      <div className="default-inpost-like-number">{postLikes}</div>
                      <img src={whiteHeart} alt="" />
                      <div>추천</div>
                    </button>
                  </>
                }
                {postScrapStatus ?
                  <>
                    <button className='scrap-status-button' onClick={() => {
                      setPostScrapStatus(false);
                      postCancelScrap(postId)}}
                    >
                      <img src={scrappedIcon} alt=""/>
                      <div>스크랩</div>
                    </button>
                  </> :
                  <>
                    <button className='default-status-scrap-button' onClick={() => {
                      setScrapSnackbarOpen(true);
                      setPostScrapStatus(true);
                      postScrap(postId);
                    }
                    }
                    >
                      <img src={unScrappedIcon} alt="" />
                      <div>스크랩</div>
                    </button>
                  </>
                }
              </div>
              {comments &&
                <Comments
                  comments={comments}
                  setRootCommentIdx={setRootCommentIdx}
                  setPlaceHolder={setPlaceHolder}
                  inputRef={inputRef}
                  handleCommentDelete={handleCommentDelete}
                  setCommentReported={setCommentReported}
                  handleReportComment={handleReportComment}
                />
              }
            </div>
          </>
        }
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
      <div className='page-section'>
        {pageFive > 0 && <img src={pagePrev} alt=''onClick={pageGoPrev}/>}
        <div className='page-wrap'>
          {Array.from(Array(Math.min(5, totalpage-pageFive*5)), (_, i) => pageFive*5+i+1).map((i) => {
            return <button className={"page" + (i == page ? " active" : "")}  key={i} onClick={()=>handlePageChange(i)}>{i}</button>
          })}
        </div>
        {pageFive < totalpage/5-1 && <img src={pageNext} alt='' onClick={pageGoNext}/>}
      </div>
       <PostScrapSnackbar handleClose={handleScrapSnackbarClose} open={scrapSnackbarOpen}/>
       <PostReportSnackbar handleClose={handleReportSnackbarClose} open={reportSnackbarOpen}/>
       <div className="bottom-bar-blocker2" ></div>
    </>
  );
}
