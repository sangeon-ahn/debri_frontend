import './BoardsPage.css';
import Header from '../Header/Header';
import Search from '../Search/Search';
import LowBar from '../LowBar/LowBar';
import React ,{useState, useEffect, useLayoutEffect}from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import toggleDown from '../../assets/toggleDown.png';
import toggleUp from '../../assets/toggleUp.png';
import ScrappedBoards from './ScrappedBoards';
import UnScrappedBoards from './UnScrappedBoards';


export default function BoardsPage() {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false); // 로딩되는지 여부
  const [error,setError] = useState(null); //에러
  const [isOpened, setIsOpened] = useState(true);
  const [isGetData, setIsGetData] = useState(0);
  const [scrappedBoards, setScrappedBoards] = useState([]);
  const [unScrappedBoards, setUnScrappedBoards] = useState([]);

  //boardList 가져오기
  useEffect( () => {
      fetchScrappedBoards();
      fetchUnScrappedBoards();
  }, []);

  // useEffect(() => {

  // }, [scrappedBoards, unScrappedBoards])

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
    try {
      const response = await axios.post(`/api/board/scrap/${boardIdx}`,
        JSON.stringify({}),
        { headers }
      );
      console.log('리턴', response);
      if (response.data.isSuccess) {
        setUnScrappedBoards(unScrappedBoards.filter(unScrappedBoard => unScrappedBoard.boardIdx !== boardIdx));
        setScrappedBoards(state => [...state, unScrappedBoards.filter(unScrappedBoard => unScrappedBoard.boardIdx === boardIdx)[0]]);
      }

    } catch (error) {
      console.error(error);
    }
  }

  //스크랩취소
  async function unScrapBoard(boardIdx) {
    try {
      const response = await axios.patch(`/api/board/scrap/cancel/${boardIdx}`,
        JSON.stringify({}),
        { headers }
      );
      console.log('리턴', response);
      if (response.data.isSuccess) {
        setUnScrappedBoards(state => [...state, scrappedBoards.filter(scrappedBoard => scrappedBoard.boardIdx === boardIdx)[0]]);
        setScrappedBoards(scrappedBoards.filter(scrappedBoard => scrappedBoard.boardIdx !== boardIdx));
      }
    } catch (error) {
      console.error(error);
      setError(error);
    }
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

  return (
    <div>
      <Header />
      <Search />
      <div className='board-list'>
          <div className="favorite-boards">
            <div className="favorite-title">
              <p>즐겨찾기된 게시판</p>
              <button onClick={handleScrappedBoardsToggle} className="boards-toggle-button">
                {isOpened ?
                  <img src={toggleDown} alt="엑박" /> :
                  <img src={toggleUp} alt="엑박" />}
              </button>
            </div>
            {isOpened &&
              <ScrappedBoards scrappedBoards={scrappedBoards} onCancelScrap={onCancelScrap}/>
            }
        </div>

        <div className='all-boards'>
          <div className='all-boards-title'>
            <p>전체 게시판</p>
          </div>
          <UnScrappedBoards unScrappedBoards={unScrappedBoards} onScrap={onScrap} />
        </div>
      </div>
    </div>
  );
}
