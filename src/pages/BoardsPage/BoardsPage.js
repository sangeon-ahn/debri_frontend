import './BoardsPage.css';
import Header from '../Header/Header';
import Search from '../Search/Search';
import LowBar from '../LowBar/LowBar';
import emptyStar from '../../assets/emptyStar.png';
import rightArrow from '../../assets/rightArrow.png';
import React ,{useState, useEffect, useLayoutEffect}from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import toggleDown from '../../assets/toggleDown.png';
import toggleUp from '../../assets/toggleUp.png';
import favoriteStar from '../../assets/favoriteStar.png';

export default function BoardsPage() {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false); // 로딩되는지 여부
  const [error,setError] = useState(null); //에러
  const [isOpened, setIsOpened] = useState(true);
  const [isGetData, setIsGetData] = useState(0);
  const [scrappedBoards, setScrappedBoards] = useState(null);
  const [unScrappedBoards, setUnScrappedBoards] = useState(null);

  //boardList 가져오기
  useEffect( () => {
      fetchScrappedBoards();
      fetchUnScrappedBoards();
  }, [isGetData])

  const headers = {
    'ACCESS-TOKEN': `${JSON.parse(localStorage.getItem("userData")).jwt}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  const fetchScrappedBoards = async () => {
    try {
      setScrappedBoards(null);
      setError(null);
      setLoading(true); //로딩이 시작됨
      const response = await axios.get(`/api/board/scrap/getList`, { headers });
      console.log(response);
      setScrappedBoards(response.data.result);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  const fetchUnScrappedBoards = async () => {
    try {
        setUnScrappedBoards(null);
        setError(null);
        setLoading(true); //로딩이 시작됨
        const response = await axios.get(`api/board/unscrap/getList`, { headers });
        console.log(response.data);
        setUnScrappedBoards(response.data.result);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

  //스크랩 생성
  async function scrapBoard(boardIdx) {
      setError(null);
      setLoading(true); //로딩이 시작됨
    try {
      const response = await axios.post(`/api/board/scrap/${boardIdx}`,
        JSON.stringify({}),
        { headers }
      );
      console.log('리턴', response);

    } catch (error) {
      console.error(error);
    }
    setIsGetData(isGetData + 1);
    setLoading(false);
  }

  //스크랩취소
  async function unScrapBoard(boardIdx) {
    try {
      setError(null);
      setLoading(true); //로딩이 시작됨
      const response = await axios.patch(`/api/board/scrap/cancel/${boardIdx}`,
        JSON.stringify({}),
        { headers }
      );
      console.log('리턴', response);

    } catch (error) {
      console.error(error);
      setError(error);
    }
    setIsGetData(isGetData + 1);
    setLoading(false);
  }

  function onScrap(e) {
      scrapBoard(e);
    }

  function onCancelScrap(e) {
    unScrapBoard(e);
  }

  function handleScrappedBoardsToggle() {
    setIsOpened(state => !state);
  }

  if (loading) return null;
  if (error) return null;
  if (!scrappedBoards || !unScrappedBoards) return null;
  
  return (
    <div>
      <Header />
      <Search />
      <div className='board-list'>
          <div className="favorite-boards">
            <div className="favorite-title">
              <p>즐겨찾기된 게시판</p>
              <button onClick={
                handleScrappedBoardsToggle
              }>
                {isOpened ? <img src={toggleDown} alt="엑박"></img> : <img src={toggleUp} alt="엑박"></img>}
              </button>
            </div>
            {isOpened &&
              <div>
                {scrappedBoards && scrappedBoards.map((board) => (
                  <div key={board.boardIdx}>
                      <div className='board-menu'>
                        <div>
                          <button onClick={() => onCancelScrap(board.boardIdx)}>
                            <img src={favoriteStar} alt="엑박" />
                          </button>
                        </div>
                        <div onClick={() => navigate(`/boards/${board.boardIdx}`)}>
                          <div style={{display:'flex', alignItems:'center'}}>
                            <div>{board.boardName}</div>
                            <img src={rightArrow} alt="엑박" width="9.44px" height="16.19px" className='right-arrow'/>
                          </div>
                        </div>
                      </div>
                  </div>
                ))}
              </div>
            }
        </div>

        <div className='all-boards'>
          <div className='all-boards-title'>
            <p>전체 게시판</p>
          </div>
          <div>
            {unScrappedBoards && unScrappedBoards.map((board) => (
              <div key={board.boardIdx}>
                  <div className='board-menu'>
                    <div>
                      <button onClick={() => onScrap(board.boardIdx)}>
                        <img src={emptyStar} alt="엑박"></img>
                      </button>
                    </div>
                    <div onClick={() => navigate(`/boards/${board.boardIdx}`)}>
                      <div style={{display:'flex', alignItems:'center'}}>
                        <div>{board.boardName}</div>
                        <img src={rightArrow} alt="엑박" width="9.44px" height="16.19px" className='right-arrow'/>
                      </div>
                    </div>
                  </div>
              </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
