import Header from '../Header/Header';
import Search from '../Search/Search';
import './Board.css';
import PostSummary from './PostSummary/PostSummary';
import leftArrow from '../../assets/leftArrow.png';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import favoriteStar from '../../assets/favoriteStar.png';
import emptyStar from '../../assets/emptyStar.png';
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
  const { state } = useLocation();
  const [board, setBoard] = useState(null);

  const headers = {
    'ACCESS-TOKEN': `${JSON.parse(localStorage.getItem("userData")).jwt}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  console.log(board);

  const fetchPosts = async (boardIdx) => {
      try {
          setPosts(null);
          setError(null);
          setLoading(true); //로딩이 시작됨
          const response = await axios.get(`/api/post/getList/${boardIdx}`, { headers });
          setPosts(response.data);
          console.log(response);
      } catch (e) {
          setError(e);
      }
      setLoading(false);
  };

  const fetchBoard = async () => {
    try {
      setBoard(null);
      setError(null);
      setLoading(true);
      const response = await axios.get('/api/board/allList', {headers});
      setBoard(filterBoardData(response.data.result));
    } catch (e) {
      setError(e);
    }
  };

  const filterBoardData = (boards) => {
    return boards.filter(board => board.boardIdx === Number(params.boardId));
  };

  useEffect( () =>{
      fetchPosts(params.boardId);
      fetchBoard(params.bordId);
  },[]);

  if (loading) return null;
  if (error) return null;
  if (!posts) return null;
  if (!board) return null;

  return (
    <>
      <Header />
      <Search />
      <div className='board-title-container'>
        <div className='board-title-box'>
          <button className='back-button' onClick={() => navigate('/boards')}>
            <img src={leftArrow} alt=''/>
          </button>
          <div className='board-title'>{board[0].boardName}</div>
          <div className='favorite-button-box'>
            <img src={favoriteStar} alt=''/>
          </div>
        </div>
        <div className='board-detail'>파이썬과 관련된 질문을 하고, 답변을 할 수 있는 게시판이에요!</div>
        {/* <div className='board-detail'>{boardTitle[boardId]}</div> */}
      </div>
      <div className='post-list'>
        {posts && posts.result.map(post => (
            <PostSummary post={post} key={post.postIdx} state={state} />
        ))}
      </div>
      <div className='write-post-container2'>
          <button
            className='write-post'
            onClick={() => navigate(`/boards/${params.boardId}/postwrite`, { state })}>
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