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
  const [boardList,setBoardList] = useState([]);   //결과값
  const [loading,setLoading] = useState(false); // 로딩되는지 여부
  const [error,setError] = useState(null); //에러 
  const [isOpened, setIsOpened] = useState(true);
  const [isGetData, setIsGetData] = useState(0);

  //boardList 가져오기
  useEffect( () => {
      getData();
  }, [isGetData])

  const headers = {
    'ACCESS-TOKEN': `${JSON.parse(localStorage.getItem("userData")).jwt}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  async function getData() {
    await axios.get(`/api/board/allList`, { headers }).then( 
      (res) => {
        res.data.result.forEach((e) =>{
          setBoardList((prev)=>[...prev,{
            boardIdx: e.boardIdx,
            boardName: e.boardName,
            boardAdmin: e.boardAdmin,
            status: e.status
          }]);
        });
      }
    )
    .catch((err)=>{
      console.log(err);
    })
  } ;

  //스크랩취소
  async function postUncrapData(boardIdx) {
    try {
      setBoardList(null);
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
    setLoading(false);
  }

  function onCancelscrap(e){
    postUncrapData(e);
    setIsGetData(isGetData + 1)
  } 

  //스크랩 생성
  async function postScrapData(boardIdx) {
    try {
      const response = await axios.post(`/api/board/scrap/${boardIdx}`,
        JSON.stringify({}),
        { headers }
      );
      console.log('리턴', response);
  
    } catch (error) {
      console.error(error);
    }
  }
  
  function onScrap(e){
    postScrapData(e);
    setIsGetData(isGetData + 1)
  } 

  function handleFavoriteBoardsToggle() {
    setIsOpened(state => !state);
  }

  if (loading) return null;
  if (error) return null;
  if (!boardList) return null; 


  return (
    <div>
      <Header />
      <Search />
      <div className='board-list'>
          <div className="favorite-boards">
            <div className="favorite-title">
              <p>즐겨찾기된 게시판</p>
              <button onClick={
                handleFavoriteBoardsToggle
              }>
                {isOpened ? <img src={toggleDown} alt="엑박"></img> : <img src={toggleUp} alt="엑박"></img>}
              </button>
            </div>
            {isOpened && 
              <div>
                {boardList.map((board) => (
                  <div>
                    {board.status === 'ACTIVE' ?
                      <div className='board-menu' key={board.boardIdx}>
                        <div>
                          <button onClick={() => onCancelscrap(board.boardIdx)}>
                            <img src={favoriteStar} alt="엑박"></img>
                          </button>
                        </div>
                        <div onClick={() => navigate(`/boards/${board.boardIdx}`)}>
                          <div style={{display:'flex', alignItems:'center'}}>
                            <div>{board.boardName}</div>
                            <img src={rightArrow} alt="엑박" width="9.44px" height="16.19px" className='right-arrow'/>
                          </div>
                        </div>
                      </div>
                      :
                      <div></div>
                    }
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
            {boardList.map((board) => (
              <div>
                {board.status === 'INACTIVE' ?
                  <div className='board-menu' key={board.boardIdx}>
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
                  :
                  <div></div>
                }         
              </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
