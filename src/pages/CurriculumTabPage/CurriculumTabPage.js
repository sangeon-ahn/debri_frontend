import Header from '../Header/Header';
import './CurriculumTabPage.css';
import greenHeart from '../../assets/greenHeart.png';
import rightArrow from '../../assets/roadmapRightArrowIcon.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TopCurri from './TopCurri/TopCurri';
import LatestCurri from './LatestCurri/LatestCurri';
import liveIcon from '../../assets/liveIcon.png';
import useInterval from './useInterval';

export default function CurriculumTabPage() {
  const headers = {
    'ACCESS-TOKEN': `${JSON.parse(localStorage.getItem("userData")).jwt}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  const [topFiveCurriList, setTopFiveCurriList] = useState(null);
  const [latestFiveCurriList, setLatestFiveCurriList] = useState(null);
  const [visibility, setVisibility] = useState(true);
  const [error, setError] = useState(null);

  const getTopTenCurriList = async () => {
    try {
      const response = await axios.get('/api/curri/scrap/topList', { headers });
      console.log(response);
      setTopFiveCurriList(response.data.result.slice(0, 5));
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  const getLatestCurriList = async () => {
    try {
      const response = await axios.get('api/curri/getNewList', { headers });
      console.log('최신커리', response);
      setLatestFiveCurriList(response.data.result);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };
  const liveIconStyle = {
    opacity: visibility ? '1' : '0',
    transition: 'all .0.5s ease-out'
  };

  useEffect(() => {
    getTopTenCurriList();
    getLatestCurriList();
  }, []);

  useInterval(() => setVisibility(state => !state), 1000);

  if (error) return null;
  
  return (
    <>
      <Header />
      <div className='curries-container'>
        <div className='curri-tab-title'>커리큘럼</div>
        <div className='me-liked-curries'>
          <div className='curri-like-box'>
            <img src={greenHeart} alt="" />
          </div>
          <div className='me-liked-curries-text'>내가 추천한 커리큘럼</div>
          <div className='navigate-button-box'>
            <img src={rightArrow} alt="" />
          </div>
        </div>
        {(topFiveCurriList && latestFiveCurriList) &&
          <div className='curriculumTab-scroll-area'>
            <div className='curri-top5-text'>유저들이 추천하는 커리큘럼 TOP 5</div>
            <div className='curri-top5'>
              {topFiveCurriList.map(curri => {
                return <TopCurri key={curri.curriIdx} curri={curri}/>
                })
              }
            </div>
            <div className='latest-curries-top-area'>
              <div className='latest-curries-text'>최신 등록 커리큘럼</div>
              <div className='latest-curries-live'>
                <div className='onair-icon-box' alt="">
                  <img src={liveIcon} alt="" style={liveIconStyle}/>
                </div>
                <div className='live-text'>LIVE</div>
              </div>
            </div>
            <div className='latest-curries'>
              {latestFiveCurriList.map(curri => {
                return <LatestCurri key={curri.curriIdx} curri={curri}/>
                })
              }
            </div>
          </div>
        }
      </div>
    </>
  );
}