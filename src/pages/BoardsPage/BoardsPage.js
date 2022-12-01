import './BoardsPage.css';
import Header from '../Header/Header';
import PostSummary from '../BoardPage/PostSummary/PostSummary';
import React ,{useState, useEffect, useLayoutEffect}from 'react';
import axios from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import toggleDown from '../../assets/toggleDown.png';
import toggleUp from '../../assets/toggleUp.png';
import ScrappedBoards from './ScrappedBoards';
import UnScrappedBoards from './UnScrappedBoards';
import searchIcon from '../../assets/searchIcon.png';
import searchIconGreen from '../../assets/searchIconGreen.png';
import favoriteStar from '../../assets/favoriteStar.png';
import leftArrow from '../../assets/leftArrow.png';
import rightArrow from '../../assets/roadmapRightArrowIcon.png';
import bookmarkGreen from '../../assets/bookmarkGreen.png';
import BoardScrapSnackbar from './BoardScrapSnackbar/BoardScrapSnackbar';
import pencil from '../../assets/pencil.png';
import writePost from '../../assets/글쓰기.png';

export default function BoardsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useLocation();
  const [loading,setLoading] = useState(false); // 로딩되는지 여부
  const [error,setError] = useState(null); //에러
  const [isOpened, setIsOpened] = useState(true);
  const [isGetData, setIsGetData] = useState(0);
  const [scrappedBoards, setScrappedBoards] = useState([]);
  const [unScrappedBoards, setUnScrappedBoards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [text, setText] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  //boardList 가져오기
  useEffect( () => {
      fetchScrappedBoards();
      fetchUnScrappedBoards();
  }, []);

  const headers = {
    'ACCESS-TOKEN': `${JSON.parse(localStorage.getItem("userData")).jwt}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  const fetchScrappedBoards = async () => {
    try {
      setError(null);
      setLoading(true); //로딩이 시작됨
      const response = await axios.get(`${baseUrl}/api/board/scrap/getList`, { headers });
      console.log(response);
      if (response.data.isSuccess) {
        setScrappedBoards(response.data.result);
      }
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  const fetchUnScrappedBoards = async () => {
    try {
        setError(null);
        setLoading(true); //로딩이 시작됨
        const response = await axios.get(`${baseUrl}/api/board/unscrap/getList`, { headers });
        console.log(response.data);
        if (response.data.isSuccess) {
          setUnScrappedBoards(response.data.result);
        }
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

  //스크랩 생성
  async function scrapBoard(boardIdx) {
    try {
      const response = await axios.post(`${baseUrl}/api/board/scrap/${boardIdx}`,
        JSON.stringify({}),
        { headers }
      );
      console.log('리턴', response);
    } catch (error) {
      console.error(error);
    }
  }

  //스크랩취소
  async function unScrapBoard(boardIdx) {
    try {
      const response = await axios.patch(`${baseUrl}/api/board/scrap/cancel/${boardIdx}`,
        JSON.stringify({}),
        { headers }
      );
      console.log('리턴', response);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }

  function onScrap(e) {
      scrapBoard(e);
      setScrappedBoards(state =>
        [...state, ...unScrappedBoards.filter(unScrappedBoard => unScrappedBoard.boardIdx === e)]);
      setUnScrappedBoards(unScrappedBoards.filter(unScrappedBoard => unScrappedBoard.boardIdx !== e));
      setSnackbarOpen(true);
    }

  function onCancelScrap(e) {
    unScrapBoard(e);
    setUnScrappedBoards(state =>
      [...state, ...scrappedBoards.filter(scrappedBoard => scrappedBoard.boardIdx === e)]);
    setScrappedBoards(scrappedBoards.filter(scrappedBoard => scrappedBoard.boardIdx !== e));
  }

  function handleScrappedBoardsToggle() {
    setIsOpened(state => !state);
  }

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
    SearchPost(e.target.value);
  }

  async function SearchPost(keyword) {
    
    try {
      const response = await axios.post(`${baseUrl}/api/post/getSearchList`,
        JSON.stringify({keyword : keyword}),
        { headers }
      );
      setSearchResult(response.data.result)
    } catch (error) {
      console.error(error);
    }
  }

  const handleSnackbarClose = (e, reason) => {
    if (reason === 'clickway') {
      return;
    }

    setSnackbarOpen(false);
  };


  return (
    <div>
      <div className='boards-page'>게시판</div>
      <div className='write-post-container3'>
        <button
          className='write-post'
          onClick={() => navigate(`/boards/1/postwrite`, {state : {prevPath: 'boards'}})}>
            <div style={{height: '16px', width:'16px', marginLeft: '15px',marginRight:'10px'} }>
              <img src={pencil} alt="엑박" className='pencil2' style={{verticalAlign:'middle'}} />
            </div>
            <div style={{height: '14px'}}>
              <img src={writePost} alt="엑박" className='write-post-text' />
            </div>
        </button>
      </div>
      <div className={`search-bar ${(text ? 'success' : 'fail')}`}>
        {text ? 
          <img src={searchIconGreen} alt="액박" className="search-icon"/>: 
          <img src={searchIcon} alt="액박" className="search-icon"/>
        }
        <input type="text" className="search" placeholder="전체 게시물 검색하기" onChange={onChange}/>
      </div>

      {text ? 
        <div className='board-list'>
          <div className="search-result">
            <img src={leftArrow} alt="엑박" width="9.44px" height="16.19px" className='left-arrow' onClick={back}/>
            <p>전체 게시글 검색 결과</p>
          </div>
          <div>
            {searchResult && <div>
              {searchResult.map(post => (
                <PostSummary post={post} key={post.postIdx} state={state} boardName={null} />
              ))}
            </div>}
          </div>
        </div>
        :
        <div className='board-list'>
          <button className="scrapPosts" onClick={()=>{navigate("/scrapPostsList")}}>
            <img src={bookmarkGreen} alt="액박" className="bookmarkPosts"/>
            <div className='scrappoststitle'>내가 스크랩한 게시물</div>
            <img src={rightArrow} alt="액박" className="rightarrow"></img>
          </button>
          <div className="favorite-boards">
            <div className="favorite-title">
              <p>즐겨찾기된 게시판</p>
              <button onClick={handleScrappedBoardsToggle} className="boards-toggle-button">
                {isOpened ?
                  <img src={toggleDown} alt="엑박" /> :
                  <img src={toggleUp} alt="엑박" />}
              </button>
            </div>
            {isOpened && !loading && scrappedBoards &&
              <ScrappedBoards scrappedBoards={scrappedBoards} onCancelScrap={onCancelScrap}/>
            }
          </div>

          <div className='all-boards'>
            <div className='all-boards-title'>
              <p>전체 게시판</p>
            </div>
            {!loading && unScrappedBoards && <UnScrappedBoards unScrappedBoards={unScrappedBoards} onScrap={onScrap} />}
          </div>
          <BoardScrapSnackbar handleClose={handleSnackbarClose} open={snackbarOpen}/>
        </div>
      }
    </div>
  );
}
