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
import { useState } from 'react';
import Wave from 'react-wavify';
import { useRecoilState } from 'recoil';
import { lowbarSelect } from '../../../Atom';

export default function CurriMain(props) {
  const navigate = useNavigate();
  const { curri, currentCurriPosition, numberOfCurries, getCurriList } = props;
  console.log(currentCurriPosition !== numberOfCurries);
  const handleCheckboxClick = () => {
    console.log('hi');
  };
  const [active, setActive] = useState(foo);
  const [lowbar, setLowbar] = useRecoilState(lowbarSelect);

  function foo() {
    if (curri) {
      if (curri.status === 'ACTIVE') {
        return true;
      } else if (curri.status === 'INACTIVE') {
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
      const response = await axios.patch(`/api/curri/modify/status`,
      JSON.stringify({
        curriIdx: curriIdx,
        status: status
      }),
      { headers }
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  const handleCurriActivation = () => {
    setActive(state => !state);

    if (curri.status === 'ACTIVE') {
      patchCurriActivation(curri.curriIdx, 'INACTIVE');
    } else {
      patchCurriActivation(curri.curriIdx, 'ACTIVE');
    }
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
  console.log(getCurriList);
  return (
    <>
      {currentCurriPosition !== numberOfCurries ?
      <div className='curri-scroll-area'>
        <div className='curri-sub-info'>
          <div className='dday-achieved-container'>
            <div className='dday'>D - {curri.dday}</div>
            <div className='horizontal-line'></div>
            <div className='achieved-rate'>
              <div className='achieved-text'>달성률</div>
              <div className='percent-text'>
                <div className={curri.progressRate === 0 ? 'zero-achieved-number' : 'achieved-number'}>{Math.floor(curri.progressRate)}</div>
                <div className='percent'>%</div>
              </div>
            </div>
          </div>
          <div className='curri-private'>
            <div className='curri-private-img-box'>
              <img src={curri.visibleStatus === 'ACTIVE' ? curriVisibleIcon : curriPrivateIcon} alt="" />
            </div>
            <div className='curri-private-text'>{curri.visibleStatus === 'ACTIVE' ? '공개중' : '비공개'}</div>
          </div>
        </div>
        <div className='curri-middle-area'>
          {curri.status === 'ACTIVE' ?
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
                <div className='curri-inactive-explain'>한 번에 하나의 커리큘럼만 진행할 수 있어요</div>
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
            <div className='curri-setting'>
              <div className='curri-setting-icon-box'>
                <img src={curriSettingIcon} alt="" />
              </div>
              <div className='curri-setting-text'>
                설정 변경
              </div>
            </div>
            <CurriSettingModal />
          </div>
        </div>
      </div>
       : <BeginCurriButton />
    }
    </>
  );
}