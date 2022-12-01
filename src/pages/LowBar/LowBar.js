import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import homeButton from '../../assets/homeButton.png';
import activeHomeButton from '../../assets/activeHomeButton.png';
import lectureButton from '../../assets/lectureButton.png';
import activeLectureButton from '../../assets/lectureGreenIcon.png';
import boardButton from '../../assets/boardButton.png';
import activeBoardButton from '../../assets/activeBoardButton.png';
import curriButton from '../../assets/curriButton.png';
import activeCurriButton from '../../assets/activeCurriButton.png';
import mypageButton from '../../assets/mypageButton.png';
import activeMypageButton from '../../assets/activeMypageButton.png';
import "./LowBar.css";
import { useRecoilState } from 'recoil';
import { lowbarSelect } from '../../Atom';

export default function LowBar() {
  const navigate = useNavigate();
  const [isButtonClicked, setIsButtonClicked] = useRecoilState(lowbarSelect);
  
  const handleLowButtonClick = (e, path) => {
    setIsButtonClicked({
      homeButton: false,
      lectureButton: false,
      boardButton: false,
      curriButton: false,
      mypageButton: false,
      [e.target.id]: true,
    })
    navigate(path);
  };
  
  if (window.location.hash === '#/') return null;
  if (window.location.hash === '#/emailAuth') return null;
  if (window.location.hash === '#/account') return null;
  // if (window.location.hash.includes('/boards/') && window.location.hash.includes('modify')) return null;
  // if (window.location.hash.includes('/boards/') && window.location.hash.includes('postwrite')) return null;
  // if (window.location.hash.includes('/lectures/') && window.location.hash.includes('detail')) return null;
  // if (window.location.hash === '#/boards/postwrite') return null;
  // if (window.location.hash === '#/roadmaps') return null;
  // if (window.location.hash === '#/home/beginCurri') return null;
  // if (window.location.hash === '#/mypage') return null;
  // if (window.location.hash === '#/createCurri') return null;
  
  return (
    <div className="fixed-bar">
      <div className="low-bar">
        <div className="home-button" onClick={(e) => handleLowButtonClick(e, '/home')} id="homeButton">
            <div className='home-icon-box' id="homeButton">
              <img id="homeButton" src={isButtonClicked.homeButton ? activeHomeButton : homeButton} alt=''/>
            </div>
            <div className={(isButtonClicked.homeButton ? ' active-home-text' : 'home-text')} id="homeButton">홈</div>
        </div>
        <div className="lecture-button" onClick={(e) => handleLowButtonClick(e, 'lectures')} id="lectureButton">
            <div className='lecture-icon-box' id="lectureButton">
              <img id='lectureButton' src={isButtonClicked.lectureButton ? activeLectureButton : lectureButton} alt="" />
            </div>
            <div className={(isButtonClicked.lectureButton ? ' active-home-text' : 'home-text')} id='lectureButton'>강의</div>
        </div>
        <div className="curriculum-button" onClick={(e) => handleLowButtonClick(e, 'curriculum')} id="curriButton">
            <div className='curriculum-icon-box' id="curriButton">
              <img id='curriButton' src={isButtonClicked.curriButton ? activeCurriButton : curriButton} alt="" />
            </div>
            <div className={(isButtonClicked.curriButton ? ' active-home-text' : 'home-text')} id="curriButton">커리큘럼</div>
        </div>
        <div className="board-button" onClick={(e) => handleLowButtonClick(e, 'boards')} id="boardButton">
            <div className='board-icon-box' id="boardButton"><img id="boardButton" src={isButtonClicked.boardButton ? activeBoardButton : boardButton} alt=''/></div>
            <div className={(isButtonClicked.boardButton ? ' active-home-text' : 'home-text')} id="boardButton">게시판</div>
        </div>
        <div className="mypage-button" onClick={(e) => handleLowButtonClick(e, 'mypage')} id="mypageButton">
            <div className='mypage-icon-box' id="mypageButton"><img id="mypageButton" src={isButtonClicked.mypageButton ? activeMypageButton : mypageButton} alt=''/></div>
            <div className={(isButtonClicked.mypageButton ? ' active-home-text' : 'home-text')} id="mypageButton">마이 페이지</div>
        </div>
      </div>
    </div>
  )
}