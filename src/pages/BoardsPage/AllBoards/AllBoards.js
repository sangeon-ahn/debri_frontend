import './AllBoards.css';
import emptyStar from '../../../assets/emptyStar.png';
import rightArrow from '../../../assets/rightArrow.png';
import React ,{useState, useEffect, useLayoutEffect}from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AllBoards() {
  const navigate = useNavigate();
  const [boardList,setBoardList] = useState(null);   //결과값
  const [loading,setLoading] = useState(false); // 로딩되는지 여부
  const [error,setError] = useState(null); //에러 

  const headers = {
    'ACCESS-TOKEN': `${JSON.parse(localStorage.getItem("userData")).jwt}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const fetchBoardList = async () => {
    try {
        setBoardList(null);
        setError(null);
        setLoading(true); //로딩이 시작됨
        const response = await axios.get(`api/board/unscrap/getList`, { headers });
        setBoardList(response.data);
        console.log(response);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    
    useEffect( () =>{
      fetchBoardList();
  },[] )
  
  if (loading) return null;
  if (error) return null;
  if (!boardList) return null; 

  async function postData(boardIdx) {
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
    postData(e);
    fetchBoardList();
  } 


  return (
    <div className='all-boards'>
      <div className='all-boards-title'>
        <p>전체 게시판</p>
      </div>
      <div>
        {boardList.result.map((board) => (
          <div className='board-menu' key={board.boardIdx}>
            <button onClick={() => onScrap(board.boardIdx)}>
              <img src={emptyStar} alt="엑박"></img>
            </button>
            <div onClick={() => navigate(`/boards/${board.boardIdx}`)}>
              <div style={{display:'flex', alignItems:'center'}}>
                <div>{board.boardName}</div>
                <img src={rightArrow} alt="엑박" width="9.44px" height="16.19px" className='right-arrow'/>
              </div>
            </div>
          </div>
          ))}
      </div>
  </div>
  );
}

