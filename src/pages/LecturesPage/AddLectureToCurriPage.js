import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import leftArrow from '../../assets/leftArrow.png';
import CurriIcon from '../../assets/orbit.gif';
import roadmapRightArrowIcon from '../../assets/roadmapRightArrowIcon.png';
import curriPrivateIcon from '../../assets/curriPrivateIcon.png';
import curriVisibleIcon from '../../assets/visibleCurriIcon.png';
import curriMiniPlusIcon from '../../assets/curriMiniPlusIcon.png';
import Header from '../Header/Header';
import {useRecoilState} from 'recoil';
import {AddSnackbarOpen} from '../../Atom';

export default function AddLectureToCurri() {
  const [loading, setLoading] = useState(false);
  const [curriList, setCurriList] = useState(null);
  const [error, setError] = useState(false);
  const { state } = useLocation();
  const lecture = state;
  const navigate = useNavigate();
  const [addSnackbarOpen, setAddSnackbarOpen] = useRecoilState(AddSnackbarOpen);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const headers = {
    'ACCESS-TOKEN': String(JSON.parse(localStorage.getItem("userData")).jwt),
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  const getCurriList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/api/curri/getList`, { headers });
      console.log("커리리스트", response);
      setCurriList(response.data.result);
    } catch(e) {
      console.log("커리 리스트 오류", e);
      setError(e);
    }
    setLoading(false);
  };

  const postInsertLecture = async (curriIdx, lectureIdx) => {
    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/api/curri/insertLecture`,
        JSON.stringify({
          curriIdx: curriIdx,
          lectureIdx: lectureIdx
        }),
        { headers }
      );
      console.log(response);
      setAddSnackbarOpen(true);
      navigate(-1);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  const handleAddLectureToCurri = (curriIdx) => {
    console.log(curriIdx)
    postInsertLecture(curriIdx, lecture.lectureIdx);
  };

  

  useEffect(() => {
    getCurriList();
  }, []);
  
  if (loading) return null;
  if (curriList === null) return null;


  console.log(curriList);

  return (
    <div className="select-curri" style={{width: '360px'}}>
      <Header/>
        <div className='curri-title-box2'>
          <button className='back-button-curri' onClick={() => navigate(-1)}>
            <img src={leftArrow} alt=''/>
          </button>
          <div className='board-title'>"{lecture.lectureName}"<span style={{fontSize:'10px'}}> 을 추가할 커리큘럼</span></div>
        </div>
            {curriList.map(curri => (
                <div className="curriculum" style={{margin:'10px 20px'}} onClick={() => handleAddLectureToCurri(curri.curriIdx)}>
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
            ))}
          <div className="start-new-curriculum-area" onClick={() => navigate('/createCurri')}>
            <button className="start-new-curriculum-box">
              <img src={curriMiniPlusIcon} alt="" className="start-curri-mini-plus-icon"/>
            </button>
            <div className="start-new-curriculum-text">새로운 커리큘럼 시작하기</div>
          </div>
    </div>
  );
}