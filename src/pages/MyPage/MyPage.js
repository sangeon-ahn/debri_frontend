import logo from '../../assets/LOGO.png';
import profile from '../../assets/Profile.png';
import human from '../../assets/human.png';
import './MyPage.css';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import leftSideIcon from '../../assets/leftSideIcon.png';
import CurriIcon from '../../assets/orbit.gif';
import roadmapRightArrowIcon from '../../assets/roadmapRightArrowIcon.png';
import curriPrivateIcon from '../../assets/curriPrivateIcon.png';
import curriVisibleIcon from '../../assets/visibleCurriIcon.png';
import React ,{useState, useEffect, useLayoutEffect}from 'react';
import axios from 'axios';

export default function MyPage() {
  const navigate = useNavigate();
  const myinfo = JSON.parse(localStorage.getItem("userData"))
  const [loading,setLoading] = useState(false); // 로딩되는지 여부
  const [error,setError] = useState(null); //에러
  const [curriList, setCurriList] = useState(null);
  const [whatTime, setWhatTime] = useState(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const headers = {
    'ACCESS-TOKEN': `${JSON.parse(localStorage.getItem("userData")).jwt}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  //강의 리스트 가져오기
  useEffect( () => {
    getCurriList();
  }, []);

  const getCurriList = async () => {
    try {
      setError(null);
      setLoading(true); //로딩이 시작됨
      const response = await axios.get(`${baseUrl}/api/curri/getList`, { headers });
      setCurriList(response.data.result);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };
  
  function LogOut() {
    localStorage.clear();
    navigate(`/`);
  }


  return (
    <div style={{color:'white'}}>
      <div className="header">
        <img src={logo} alt="액박" className="logo" onClick={()=>{navigate("/home")}}/>
      </div>

      <div className="roadmap-back-box" onClick={() => navigate(-1)}>
        <img src={leftSideIcon} alt="" />
      </div>

      {!myinfo.firstLogin &&
        <div>
          <div className='name_my'>{myinfo.userName}</div>
          <div className='id_my'>{myinfo.userID}</div>
          <img src={profile} alt="액박" className='profile_my' />
          <img src={human} alt="액박" className='human_my' />
        </div>
      }

      <div>
        <div className='ing_Curi'>진행 중인 커리큘럼</div>
        {curriList &&
          <div>
            {curriList.map(curri => 
              <div key={curri.curriIdx}>
              {(curri.progressRate > 0 && curri.progressRate < 100) &&
                <div className="curriculum" style={{margin:'10px 20px'}} onClick={() => navigate(`/curriculum/39`)}>
                  <div className="curriculum-Icon-box">
                    <img src={CurriIcon} alt="" />
                  </div>
                  <div className="roadmap-detail-box">
                    <div className="roadmap-title">{curri.curriName}</div>
                    <div className="roadmap-description">{curri.createdAt}</div>
                    <div className='curri-private'>
                      <div className='curri-private-img-box'>
                        <img src={curri.visibleStatus === 'ACTIVE' ? curriVisibleIcon : curriPrivateIcon} alt="" />
                      </div>
                      <div className='curri-private-text'>{curri.visibleStatus === 'ACTIVE' ? '공개중' : '비공개'}</div>
                    </div>
                  </div>
                  <div className="roadmap-main-go-button-box">
                    <img src={roadmapRightArrowIcon} alt="" />
                  </div>
                </div>
              }
              </div>
            )}
          </div>
        }
      </div>

      <div className='logout' onClick={LogOut}>
        로그아웃
      </div>
    </div>
  );
}