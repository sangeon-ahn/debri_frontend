import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import Search from "../Search/Search";
import './PostPage.css';
import leftArrow from '../../assets/leftArrow.png';
// import greenUpThumb from '../../assets/greenUpThumb.png';
import postUserProfile from '../../assets/postUserProfile.png';
import userReport from '../../assets/userReport.png';
import { useEffect, useState } from "react";
import axios from "axios";
import Comments from "./Comments/Comments";
import WriteComment from "./WriteComment/WriteComment";
import postMenuIcon from "../../assets/postMenuIcon.png";
import Modal from 'react-modal';

export default function PostPage() {
  const navigate = useNavigate();
  // const { board,} = location.state;
  // const {id} = location.state.post;
  const location = useLocation();
  const params = useParams();

  const { boardId, postId } = params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [comments, setComments] = useState(null);
  const [isPostSettingModalOn, setIsPostSettingModalOn] = useState(false);
  const [post, setPost] = useState(null);
  const userIdx = localStorage.getItem("userIdx");

  const fetchPost = async (postIdx) => {
    try {
      setError(null);
      setComments(null);
      setLoading(true);
      const response = await axios.get(`/api/post/get/${postIdx}`);
      setPost(response.data.result);
    } catch (e) {
      setError(e);
      console.log(e);
    }
    setLoading(false);
  };

  const fetchComments = async (postIdx) => {
    try {
      setError(null);
      setComments(null);
      setLoading(true);
      const response = await axios.get(`/api/comment/get/${postIdx}`);
      if (response.data.isSuccess) {
        setComments(response.data.result);
      } else {
        setComments([]);
      }
      console.log(response);
    } catch (e) {
      setError(e);
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPost(postId);
    fetchComments(postId);
    // window.addEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = e => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const myScroll = e.srcElement.scrollingElement.scrollTop;
    console.log('전체 body 의 높이 : ' + scrollHeight);
    console.log('전체 스크롤바 높이 : ' + innerHeight);
    console.log('현재 스크롤 위치 : ' + myScroll);
  }

  const handleEnterInput = (e, content, authorName) => {
    const UploadComment = async (userIdx, postIdx, content, authorName) => {
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

    UploadComment(userIdx, postId, content, authorName);
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
  const headers = {
        'ACCESS-TOKEN': 'eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWR4IjoyLCJpYXQiOjE2NTgxMDU0NTQsImV4cCI6NTk2OTE3OTYzNDY4ODAwMH0.TIGybn0SXq51j0pLOxRFraDgxbN2HtcFxQAQ93mKBlY',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

  const handlePostDeleteClick = e => {
    const deletePost = async (postIdx) => {
      try {
        const response = axios.patch(`/api/post/${postIdx}/status`,
            { headers }
        );
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    deletePost();
  };

  if (loading) return <div>로딩중!</div>
  if (error) return <div>에러발생!</div>
  if (!post) return <div>로딩중!</div>;
  if (!comments) return <div>로딩중!</div>;

  return (
    <>
      <Header />
      <Search />
      <div className="post-container">
        <div className='board-title-box'>
          <button className='back-button' onClick={() => navigate(-1)}>
            <img src={leftArrow} alt=''/>
          </button>
          <div className='board-title'>게시판제목</div>
        </div>
        <Modal
          closeTimeoutMS={300}
          isOpen={isPostSettingModalOn}
          onRequestClose={() => setIsPostSettingModalOn(state => !state)}
          style={customStyles}
          contentLabel="Example Modal"
        >
         <div className="post-setting-container">
            <div className="post-setting-menu-container">
              <div className="post-setting-modal-title">게시물 관리</div>
              <button className="post-modify" onClick={() => navigate(`/boards/${boardId}/${postId}/modify`, {state: {post: post}})}>수정하기</button>
              <button className="post-delete" onClick={() => {
                handlePostDeleteClick();
                navigate(-1);
              }}>삭제하기</button>
            </div>
            <button className="post-setting-cancel-container" onClick={() => setIsPostSettingModalOn(state => !state)}>닫기</button>
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
            <div className="post-elapsed-time">{post.timeAfterCreated}</div>
          </div>
          <div className="post-user-info">
            <div className="post-user-profile">
              <img src={postUserProfile} alt="엑박" />
            </div>
            <div className="post-user-nickname">{post.authorName} ></div>
          </div>
        </div>
        <div className="report-user-box">
          <div className="report-icon-box">
            <img src={userReport} alt='엑박' />
          </div>
          <div className="post-report-text">신고하기</div>
        </div>
        <div className="post-main-content">{post.contents}</div>
        <div className="post-button-container">
          <button className="up-vote-button">추천</button>
          <button className="scrap-button">스크랩</button>
        </div>
        {comments && <Comments comments={comments} />}
      </div>
        <WriteComment handleEnterInput={handleEnterInput} />
       <div style={{position:"fixed", zIndex: 1, width: '360px', height: '100px', backgroundColor: '#0A1123', bottom: '10px'}} ></div>
    </>
  );
}
