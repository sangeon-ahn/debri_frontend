import Header from '../Header/Header';
import './CurriculumTabPage.css';
import greenHeart from '../../assets/greenHeart.png';
import rightArrow from '../../assets/roadmapRightArrowIcon.png';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import TopCurri from './TopCurri/TopCurri';
import Curris from "./Curris/Curris";

export default function CurriculumTabPage() {
  const headers = {
    'ACCESS-TOKEN': `${JSON.parse(localStorage.getItem("userData")).jwt}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  const [topFiveCurriList, setTopFiveCurriList] = useState(null);
  const [allCurriList, setAllCurriList] = useState(null);
  const [likeCurriList, setLikeCurriList] = useState(null);
  const [error, setError] = useState(null);
  const [allCurris, setAllCurris] = useState(true);
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const getTopTenCurriList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/curri/scrap/topList`, { headers });
      console.log(response);
      setTopFiveCurriList(response.data.result.slice(0, 5));
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  const getAllCurriList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/curri/getList`, { headers });
      console.log(response);
      setAllCurriList(response.data.result);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  const getLikeCurriList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/curri/getScrapList`, { headers });
      console.log(response);
      setLikeCurriList(response.data.result);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  const selectAllCurris =()=>{
    setAllCurris(true)
  };

  const selectLikeCurris =()=>{
    setAllCurris(false)
  };

  useEffect(() => {
    getTopTenCurriList();
    getAllCurriList();
    getLikeCurriList();
  }, []);

  if (error) return null;
  
  return (
    <>
      <Header />
      <div className='curries-container'>
        <div className='curri-tab-title'>커리큘럼</div>
        <div className='me-liked-curries' onClick={()=>{navigate("/recoCurri")}}>
          <div className='curri-like-box'>
            <img src={greenHeart} alt="" />
          </div>
          <div className='me-liked-curries-text'>내가 추천한 커리큘럼</div>
          <div className='navigate-button-box'>
            <img src={rightArrow} alt="" />
          </div>
        </div>
        {topFiveCurriList &&
          <div className='curriculumTab-scroll-area'>
            <div className='curri-top5-text'>유저들이 추천하는 커리큘럼 TOP 5</div>
            <div className='curri-top5'>
              {topFiveCurriList.map(curri => {
                return <TopCurri key={curri.curriIdx} curri={curri}/>
                })
              }
            </div>
          </div>
        }
        <div className="select-curris">
          <div className={`select-curris-items ${allCurris ? 'success' : 'fail'}`} onClick={selectAllCurris}>전체 커리큘럼</div>
          <div className={`select-curris-items ${allCurris ? 'fail' : 'success'}`} onClick={selectLikeCurris}>좋아요한 커리큘럼</div>
          <div className={`green-bar ${allCurris ? 'success' : 'fail'}`}></div>
          <div className={`green-bar ${allCurris ? 'fail' : 'success'}`}></div>
        </div>
        {allCurris && allCurriList &&
          <div>
            {allCurriList.map(curri => {
              return <Curris key={curri.curriIdx} curri={curri}/>
              })
            }
          </div>
        }
        {!allCurris && likeCurriList &&
          <div>
            {likeCurriList.map(curri => {
              return <Curris key={curri.curriIdx} curri={curri}/>
              })
            }
          </div>
        }
      </div>
    </>
  );
}