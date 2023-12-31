import './CurriMain.css';
import curriPrivateIcon from '../../../assets/curriPrivateIcon.png';
import curriOptionIcon from '../../../assets/curriOptionIcon.png';
import curriLectureDetailIcon from '../../../assets/curriLectureDetailIcon.png';
import BeginCurriButton from '../BeginCurriButton/BeginCurriButton';
import curriVisibleIcon from '../../../assets/visibleCurriIcon.png';
import CurriLecture from '../CurriLecture/CurriLecture';
import CurriChapter from '../CurriChapter/CurriChapter';
import lectureInsertIcon from '../../../assets/curriLectureInsertIcon.png';
import curriSettingIcon from '../../../assets/curriSettingIcon.png';
import CurriSettingModal from '../CurriSettingModal/CurriSettingModal';
import { useNavigate } from 'react-router-dom';
import curriInactiveCircleIcon from '../../../assets/curriInactiveCircleIcon.png';
import curriActiveButtonImgIcon from '../../../assets/curriActiveButtonIcon.png';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Wave from 'react-wavify';
import { useRecoilState } from 'recoil';
import { lowbarSelect } from '../../../Atom';
import CurriRenameModal from '../CurriRenameModal/CurriRenameModal';
import redCircleIcon from '../../../assets/curriRedCircleIcon.png';
import { CurriPublicSnackbar } from '../CurriPublicSnackbar/CurriPublicSnackbar';
import { CurriPrivateSnackbar } from '../CurriPrivateSnackbar/CurriPrivateSnackbar';
import CurriResetModal from '../CurriResetModal/CurriResetModal';
import CurriDeleteModal from '../CurriDeleteModal/CurriDeleteModal';
import curriNonActivateIcon from '../../../assets/curriNonActivateIcon.png';

export default function CurriMain(props) {
  const navigate = useNavigate();
  const { curri, currentCurriPosition, numberOfCurries, getCurriList } = props;
  console.log(currentCurriPosition !== numberOfCurries);
  const handleCheckboxClick = () => {
    console.log('hi');
  };
  const [active, setActive] = useState(initialActiveStatus);
  const [publicStatus, setPublicStatus] = useState(initialPublicStatus);
  const [lowbar, setLowbar] = useRecoilState(lowbarSelect);
  const [curriSettingModalOn, setCurriSettingModalOn] = useState(false);
  const [curriRenameModalOn, setCurriRenameModalOn] = useState(false);
  const [rightPosition, setRightPosition] = useState(-348);
  const [activate, setActivate] = useState(0);

  const baseUrl = process.env.REACT_APP_BASE_URL;
  function initialActiveStatus() {
    if (curri) {
      if (curri.status === 'ACTIVE') {
        return true;
      } else if (curri.status === 'INACTIVE') {
        return false;
      }
    }
  }

  function initialPublicStatus() {
    if (curri) {
      if (curri.visibleStatus === 'ACTIVE') {
        return true;
      } else if (curri.visibleStatus === 'INACTIVE') {
        return false;
      }
    }
  }
  
  const waveStyle = {
  overflow: 'hidden',
  position: 'absolute',
  width: '290px',
  height: '290px',
  left: '33px',
  top: '13px',
  opacity: '0.17',
  borderRadius: '145px',
  border: '2px solid #66CC66',
  };

  const headers = {
    'ACCESS-TOKEN': String(JSON.parse(localStorage.getItem("userData")).jwt),
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  const patchCurriActivation = async (curriIdx, status) => {
    try {
      const response = await axios.patch(`${baseUrl}/api/curri/modify/status`,
      JSON.stringify({
        curriIdx: curriIdx,
        status: status
      }),
      { headers }
      );
      console.log(response);
      setActivate(state => state + 1);
    } catch (e) {
      console.log(e);
    }
  };

  const patchCurriVisibility = async (curriIdx, visibleStatus) => {
    let setVisibleStatus = '';

    if (visibleStatus === 'ACTIVE') {
      setVisibleStatus = 'INACTIVE';
    } else if (visibleStatus === 'INACTIVE') {
      setVisibleStatus = 'ACTIVE';
    }

    try {
      const response = await axios.patch(`${baseUrl}/api/curri/modify/visibleStatus`,
        JSON.stringify({
          curriIdx: curriIdx,
          visibleStatus: setVisibleStatus
        }),
        { headers }
      );
      console.log(response);
      setCurriSettingModalOn(false);
      getCurriList();
      scrollTop();
    } catch (e) {
      console.log(e);
    }
  };

  const scrollTop = () => {
    const $curriScrollArea = document.querySelector('.curri-scroll-area');
      $curriScrollArea.scrollTop = 0 ;
  }

  const deleteCurri = async (curriIdx) => {
    try {
      const response = await axios.patch(`${baseUrl}/api/curri/delete/${curriIdx}`, JSON.stringify({}), { headers });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
    setCurriDeleteModalOn(false);
    getCurriList();
    scrollTop();
  };

  const renameCurri = () => {
    setCurriSettingModalOn(false);
    setCurriRenameModalOn(true);
  };

  const resetCurri = async (curriIdx) => {
    try {
      const response = await axios.patch(`${baseUrl}/api/curri/reset/${curriIdx}`, JSON.stringify({}), { headers });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
    setCurriResetModalOn(false);
    getCurriList();
    scrollTop();
  };

  const handleCurriActivation = () => {
    console.log(curri.active, active);
    if (active === true) {
      patchCurriActivation(curri.curriIdx, 'INACTIVE');
    } else {
      patchCurriActivation(curri.curriIdx, 'ACTIVE');
    }
    scrollTop();
  };
  const handleCurriInsertLecture = () => {
    setLowbar({
      homeButton: false,
      lectureButton: true,
      boardButton: false,
      curriButton: false
    });
    navigate('/lectures');
  };

  const handleModalCloseClick = () => {
    setCurriSettingModalOn(false);
  };

  const [publicSnackbarOpen, setPublicSnackbarOpen] = useState(false);
  const [privateSnackbarOpen, setPrivateSnackbarOpen] = useState(false);
  const [curriResetModalOn, setCurriResetModalOn] = useState(false);
  const [curriDeleteModalOn, setCurriDeleteModalOn] = useState(false);

  const handlePublicSnackbarClose = (e, reason) => {
    if (reason === 'clickway') {
      return;
    }

    setPublicSnackbarOpen(false);
  };

  const handlePrivateSnackbarClose = (e, reason) => {
    if (reason === 'clickway') {
      return;
    }

    setPrivateSnackbarOpen(false);
  };

  const resetModalControl = () => {
    setCurriSettingModalOn(false);
    setCurriResetModalOn(true);
  };

  const deleteModalControl = () => {
    setCurriSettingModalOn(false);
    setCurriDeleteModalOn(true);
  };

  useEffect(() => {
    if (activate === 0) return;

    setActive(state => !state);
  }, [activate]);

  return (
    <div className='curri-main'>
      {currentCurriPosition !== numberOfCurries && curri ?
      <div className='curri-scroll-area'>
        <div className='curri-sub-info'>
          <div className='curri-private'>
            <div className='curri-private-img-box'>
              <img src={curri.visibleStatus === 'ACTIVE' ? curriVisibleIcon : curriPrivateIcon} alt="" />
            </div>
            <div className='curri-private-text'>{curri.visibleStatus === 'ACTIVE' ? '공개중' : '비공개'}</div>
          </div>
          <div className='dday-achieved-container'>

            <div className='dday-container'>
              <div className='dday'>D-</div>
              <div className={curri.dday === 0 ? 'dday' : 'dday-green'}>{curri.dday <= 9 ? '0' + curri.dday : curri.dday}</div>
            </div>
            {/* <div className='horizontal-line'></div> */}
            <div className='achieved-rate'>
              <div className='achieved-text'>달성률</div>
              <div className='percent-text'>
                <div className={curri.progressRate === 0 ? 'zero-achieved-number' : 'achieved-number'}>{Math.floor(curri.progressRate)}</div>
                <div className='percent'>%</div>
              </div>
            </div>
          </div>
        </div>
        <div className='curri-middle-area'>
          {curri.lectureListResList.length === 0 && active ?
            <>
              <div className='curri-red-circle-box'>
                <img src={redCircleIcon} alt="" />
                <div className='curri-red-circle-text'>현재 선택된 강의가 없어요!</div>
              </div>
            </> :
              curri.status === 'ACTIVE' && active ?
                <>
                  <div className='curri-green-circle-border'></div>
                  <div className='curri-green-circle-inner'></div>
                  <Wave fill='#66CC66' style={waveStyle}
                    paused={false}
                    options={{
                    height: 290 - (curri.progressRate / 100) * 300,
                    amplitude: 10,
                    speed: 0.3,
                    points: 3
                    }}
                  />
                  <div className='curri-stone-checks'>
                    {curri.chapterListResList.map(chapter =>
                      <CurriChapter
                        key={chapter.chIdx}
                        chapter={chapter}
                        handleCheckboxClick={handleCheckboxClick}
                        getCurriList={getCurriList}
                      />
                    )}
                  </div>
                </> :
                <>
                {active ?
                  <>
                    <div className='curri-green-circle-border'></div>
                    <div className='curri-green-circle-inner'></div>
                      <div className='curri-stone-checks'>
                        {curri.chapterListResList.map(chapter =>
                          <CurriChapter
                            key={chapter.chIdx}
                            chapter={chapter}
                            handleCheckboxClick={handleCheckboxClick}
                          />
                        )}
                      </div>
                  </> :
                <div className='curri-inactive-container'>
                  <div className='curri-inactive-circle-icon-box'>
                    <img src={curriInactiveCircleIcon} alt="" />
                  </div>
                  <div className='curri-inactive-main'>
                    <div className='curri-inactive-text'>커리큘럼 비활성화 중</div>
                    {/* <div className='curri-inactive-explain'>한 번에 하나의 커리큘럼만 진행할 수 있어요</div> */}
                    <button className='curri-activate-button' onClick={handleCurriActivation}>
                      <div className='curri-active-button-img-box'>
                        <img src={curriActiveButtonImgIcon} alt="" />
                      </div>
                      <div className='curri-active-button-text'>
                        커리큘럼 활성화
                      </div>
                    </button>
                  </div>
                </div>}
                </>
              
          }
          <div className='curri-horizontal-line'></div>
          <div className='curri-lectures-area'>
            <div className='curri-lectures-area-title'>관련 강의자료</div>
            <div className='curri-lectures'>
              {curri.lectureListResList.map(lecture =>
                <CurriLecture lecture={lecture} key={lecture.lectureIdx} />
              )}
            </div>
            <div className='curri-insert-lecture' onClick={handleCurriInsertLecture}>
              <div className='lecture-insert-icon-box'>
                <img src={lectureInsertIcon} alt="" />
              </div>
              <div className='lecture-vertical-line'></div>
              <div className='curri-lecture-main'>
                <div className='insert-lecture-text'>
                  새로운 강의 추가하기
                </div>
              </div>
            </div>
            <div className='curri-option-container'>
              <div className='curri-nonactivate' onClick={handleCurriActivation}>
                <div className='curri-nonactivate-icon-box'>
                  <img src={curriNonActivateIcon} alt="" />
                </div>
                <div className='curri-nonactivate-text'>비활성화</div>
              </div>
              <div className='curri-setting' onClick={() => setCurriSettingModalOn(state=>!state)}>
                <div className='curri-setting-icon-box'>
                  <img src={curriSettingIcon} alt="" />
                </div>
                <div className='curri-setting-text'>
                  설정 변경
                </div>
              </div>
            </div>
            <CurriSettingModal
              isOpen={curriSettingModalOn}
              onRequestClose={() => setCurriSettingModalOn(false)}
              patchCurriActivation={patchCurriActivation}
              patchCurriVisibility={patchCurriVisibility}
              curri={curri}
              renameCurri={renameCurri}
              deleteModalControl={deleteModalControl}
              resetModalControl={resetModalControl}
              handleModalCloseClick={handleModalCloseClick}
              getCurriList={getCurriList}
              setPublicSnackbarOpen={setPublicSnackbarOpen}
              setPrivateSnackbarOpen={setPrivateSnackbarOpen}
            />
            <CurriRenameModal
              isOpen={curriRenameModalOn}
              onRequestClose={() => setCurriRenameModalOn(false)}
              getCurriList={getCurriList}
              curri={curri}
            />
            <CurriResetModal
              isOpen={curriResetModalOn}
              onRequestClose={() => setCurriResetModalOn(false)}
              getCurriList={getCurriList}
              curri={curri}
              resetCurri={resetCurri}
            />
            <CurriDeleteModal
              isOpen={curriDeleteModalOn}
              onRequestClose={() => setCurriDeleteModalOn(false)}
              getCurriList={getCurriList}
              curri={curri}
              deleteCurri={deleteCurri}
            />
          </div>
        </div>
      <CurriPublicSnackbar handleClose={handlePublicSnackbarClose} open={publicSnackbarOpen} />
      <CurriPrivateSnackbar handleClose={handlePrivateSnackbarClose} open={privateSnackbarOpen} />
      </div>
       : <BeginCurriButton />
      }
    </div>
  );
}