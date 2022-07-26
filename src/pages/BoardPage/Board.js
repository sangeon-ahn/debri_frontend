import Header from '../Header/Header';
import Search from '../Search/Search';
import './Board.css';
import PostSummary from './PostSummary/PostSummary';
import leftArrow from '../../assets/leftArrow.png';
import { useNavigate, useParams } from 'react-router-dom';
import favoriteStar from '../../assets/favoriteStar.png';
import LowBar from '../LowBar/LowBar';
import pencil from '../../assets/pencil.png';
import writePost from '../../assets/글쓰기.png';
import React ,{useState,useEffect}from 'react';
import axios from 'axios';

export default function Board() {
  const navigate = useNavigate();
  const params = useParams();
  const [posts,setPosts] = useState(null);   //결과값
  const [loading,setLoading] = useState(false); // 로딩되는지 여부
  const [error,setError] = useState(null); //에러

  console.log(params)

  const fetchPosts = async (boardIdx) => {
      try {
          setPosts(null);
          setError(null);
          setLoading(true); //로딩이 시작됨
          const response = await axios.get(`/api/post/getList/${boardIdx}`);
          setPosts(response.data);
      } catch (e) {
          setError(e);
      }
      setLoading(false);
  };

  useEffect( () =>{
      // fetchPosts(1);
      fetchPosts(params.boardId);
  },[] )

  console.log(posts)

  if (loading) return <div>로딩중..</div>
  if (error) return <div>에러 발생!!</div>
  if (!posts) return null;
  
  const boardTitle = {
    1: '파이썬과 관련된 질문을 하고, 답변을 할 수 있는 게시판이에요!'
  };

  console.log(posts.result);

  return (
    <>
      <Header />
      <Search />
      <div className='board-title-container'>
        <div className='board-title-box'>
          <button className='back-button' onClick={() => navigate(-1)}>
            <img src={leftArrow} alt=''/>
          </button>
          <div className='board-title'>"Python" 질문 게시판</div>
          <div className='favorite-button-box'>
            <img src={favoriteStar} alt=''/>
          </div>
        </div>
        <div className='board-detail'>파이썬과 관련된 질문을 하고, 답변을 할 수 있는 게시판이에요!</div>
        {/* <div className='board-detail'>{boardTitle[boardId]}</div> */}
      </div>
      <div className='post-list'>
        {posts.result.map(post => (
            <PostSummary post={post} key={post.postIdx} />
        ))}
      </div>
      <div className='write-post-container2'>
          <button
            className='write-post'
            onClick={() => navigate(`/boards/${params.boardId}/postwrite`)}>
              <div style={{height: '16px', width:'16px', marginLeft: '15px',marginRight:'10px'} }>
                <img src={pencil} alt="엑박" className='pencil2' style={{verticalAlign:'middle'}} />
              </div>
              <div style={{height: '14px'}}>
                <img src={writePost} alt="엑박" className='write-post-text' />
              </div>
          </button>
        </div>
    </>
  );
}