import './BoardsPage.css';
import Header from '../Header/Header';
import LowBar from '../LowBar/LowBar';
import React ,{useState, useEffect, useLayoutEffect}from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import toggleDown from '../../assets/toggleDown.png';
import toggleUp from '../../assets/toggleUp.png';
import ScrappedBoards from './ScrappedBoards';
import UnScrappedBoards from './UnScrappedBoards';
import searchIcon from '../../assets/searchIcon.png';
import searchIconGreen from '../../assets/searchIconGreen.png';
import favoriteStar from '../../assets/favoriteStar.png';
import leftArrow from '../../assets/leftArrow.png';


export default function BoardsPage() {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false); // 로딩되는지 여부
  const [error,setError] = useState(null); //에러
  const [isOpened, setIsOpened] = useState(true);
  const [isGetData, setIsGetData] = useState(0);
  const [scrappedBoards, setScrappedBoards] = useState([]);
  const [unScrappedBoards, setUnScrappedBoards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [text, setText] = useState(false);

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
      setError(null);
      setLoading(true); //로딩이 시작됨
      const response = await axios.get(`/api/board/scrap/getList`, { headers });
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
        const response = await axios.get(`api/board/unscrap/getList`, { headers });
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
      const response = await axios.post(`/api/board/scrap/${boardIdx}`,
        JSON.stringify({}),
        { headers }
      );
      console.log('리턴', response);
      if (response.data.isSuccess) {
        setScrappedBoards(state =>
          [...state, ...unScrappedBoards.filter(unScrappedBoard => unScrappedBoard.boardIdx === boardIdx)]);
        setUnScrappedBoards(unScrappedBoards.filter(unScrappedBoard => unScrappedBoard.boardIdx !== boardIdx));
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
        setUnScrappedBoards(state => 
          [...state, ...scrappedBoards.filter(scrappedBoard => scrappedBoard.boardIdx === boardIdx)]);
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

  //검색
  const onChange =(e)=>{
    setText(true)
    if(e.target.value===''){
      setText(false)
    }
    e.preventDefault() 
    setSearchTerm(e.target.value)
    console.log(e.target.value)
  }

  return (
    <div>
      <Header />

      <div className={`search-bar ${(text ? 'success' : 'fail')}`}>
        {text ? <img src={searchIconGreen} alt="액박" className="search-icon" onClick={() => navigate(-1)}/> : <img src={searchIcon} alt="액박" className="search-icon" onClick={() => navigate(-1)}/>}
        <input type="text" className="search" placeholder="검색어를 입력하세요" onChange={onChange}
          {...scrappedBoards.filter((val) =>{
              if(searchTerm === ""){
                return val
              }else if(val.boardName.toLowerCase().includes(searchTerm.toLowerCase())){
                return val
              }
            }).map(data =>{
              <p style={{color:"white"}}>{data.boardName}</p>
          })}/>
      </div>

      {text ? 
        <div className='board-list'>
          <div className="search-result">
            <img src={leftArrow} alt="엑박" width="9.44px" height="16.19px" className='left-arrow'/>
            <p>게시판 검색 결과</p>
          </div>
        </div>
        :
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
        </div>
      }
    </div>
  );
}
