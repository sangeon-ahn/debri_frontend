import Header from '../Header/Header';
import './Board.css';
import PostSummary from './PostSummary/PostSummary';
import leftArrow from '../../assets/leftArrow.png';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import favoriteStar from '../../assets/favoriteStar.png';
import emptyStar from '../../assets/emptyStar.png';
import LowBar from '../LowBar/LowBar';
import pencil from '../../assets/pencil.png';
import writePost from '../../assets/글쓰기.png';
import searchIcon from '../../assets/searchIcon.png';
import searchIconGreen from '../../assets/searchIconGreen.png';
import React ,{useState,useEffect}from 'react';
import axios from 'axios';
import BoardScrapSnackbar from '../BoardsPage/BoardScrapSnackbar/BoardScrapSnackbar';

export default function Board() {
  const navigate = useNavigate();
  const params = useParams();
  const [posts,setPosts] = useState(null);   //결과값
  const [loading,setLoading] = useState(false); // 로딩되는지 여부
  const [error,setError] = useState(null); //에러
  const { state } = useLocation();
  const [board, setBoard] = useState(null);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [scrapped, setScrapped] = useState(searchParams.get('scrapped'));
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [text, setText] = useState(false);

  console.log(board);

  const headers = {
    'ACCESS-TOKEN': `${JSON.parse(localStorage.getItem("userData")).jwt}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  useEffect( () =>{
        fetchPosts(params.boardId);
        fetchBoard();
    },[]);

  const fetchPosts = async (boardIdx) => {
      try {
          setError(null);
          setLoading(true); //로딩이 시작됨
          const response = await axios.get(`/api/post/getList/${boardIdx}`, { headers });
          if (response.data.isSuccess) {
            const sortedPosts = response.data.result.sort((a, b) => b.postIdx - a.postIdx);
            setPosts(sortedPosts);
          }
          console.log(response);
      } catch (e) {
          setError(e);
      }
      setLoading(false);
  };

  const fetchBoard = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.get('/api/board/allList', {headers});
      setBoard(...filterBoardData(response.data.result));
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  

  async function scrapBoard(boardIdx) {
    try {
      const response = await axios.post(`/api/board/scrap/${boardIdx}/`,
        JSON.stringify({}),
        { headers }
      );
      console.log('리턴', response);
    } catch (error) {
      console.error(error);
    }
  }

  async function unScrapBoard(boardIdx) {
    try {
      const response = await axios.patch(`/api/board/scrap/cancel/${boardIdx}/`,
        JSON.stringify({}),
        { headers }
      );
      console.log('리턴', response);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }

  const handleScrap = () => {
    scrapBoard(params.boardId);
    setSearchParams({scrapped: true});
    setScrapped(true);
    setSnackbarOpen(true);
  };

  const handleUnScrap = () => {
    unScrapBoard(params.boardId);
    setSearchParams({scrapped: false});
    setScrapped(false);
  };

  const handleSnackbarClose = (e, reason) => {
    if (reason === 'clickway') {
      return;
    }

    setSnackbarOpen(false);
  };
  
  const filterBoardData = (boards) => {
      return boards.filter(board => board.boardIdx === Number(params.boardId));
    };
    
  if (error) return null;

  //검색
  function back() {
    setText(false)
    setSearchTerm("")
  }

  const onChange =(e)=>{
    setText(true)
    if(e.target.value===''){
      setText(false)
    }
    e.preventDefault() 
    SearchPost(params.boardId, e.target.value);
  }

  const SearchPost = async (boardIdx, key) => {
    try {
        setError(null);
        setLoading(true); //로딩이 시작됨
        const response = await axios.get(`/api/post/boardPostList/${boardIdx}?key=${key}`, { headers });
        setSearchResult(response.data.result)
        console.log(response.data);
    } catch (e) {
        setError(e);
    }
    setLoading(false);
  };

  return (
    <>
      <Header />

      <div className={`search-bar ${(text ? 'success' : 'fail')}`}>
        {text ? 
          <img src={searchIconGreen} alt="액박" className="search-icon"/>: 
          <img src={searchIcon} alt="액박" className="search-icon"/>
        }
        <input type="text" className="search" placeholder="검색어를 입력하세요" onChange={onChange}/>
      </div>

      {text ?
        <div className='board-list'>
          <div className="search-result">
            <img src={leftArrow} alt="엑박" width="9.44px" height="16.19px" className='left-arrow' onClick={back}/>
            <p>검색 결과</p>
          </div>
          <div>
            {searchResult && <div>
              {searchResult.map(post => (
                <PostSummary post={post} key={post.postIdx} state={state} boardName={board.boardName} />
              ))}
            </div>}
          </div>
        </div>
        :
        <div>
          <div className='board-title-container'>
            {board && <>
              <div className='board-title-box'>
              <button className='back-button' onClick={() => navigate('/boards')}>
                <img src={leftArrow} alt=''/>
              </button>
              <div className='board-title'>{board.boardName}</div>
              {JSON.parse(scrapped) ?
              <button className='favorite-button-box' onClick={handleUnScrap}>
                <img src={favoriteStar} alt=''/>
              </button> :
              <button className='favorite-button-box' onClick={handleScrap}>
              <img src={emptyStar} alt=''/>
            </button>
            }
            </div>
            <div className='board-detail'>파이썬과 관련된 질문을 하고, 답변을 할 수 있는 게시판이에요!</div>
            </>}
          </div>

          {posts && board && <div className='post-list'>
            {posts.map(post => (
                <PostSummary post={post} key={post.postIdx} state={state} boardName={board.boardName} />
            ))}
          </div>}

          <div className='write-post-container2'>
              <button
                className='write-post'
                onClick={() => navigate(`/boards/${params.boardId}/postwrite?scrapped=${scrapped}`, { state })}>
                  <div style={{height: '16px', width:'16px', marginLeft: '15px',marginRight:'10px'} }>
                    <img src={pencil} alt="엑박" className='pencil2' style={{verticalAlign:'middle'}} />
                  </div>
                  <div style={{height: '14px'}}>
                    <img src={writePost} alt="엑박" className='write-post-text' />
                  </div>
              </button>
          </div>
        </div>        
      }    
      <BoardScrapSnackbar handleClose={handleSnackbarClose} open={snackbarOpen}/>
    </>
  );
}