import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import homeButton from '../../assets/homeButton.png';
import activeHomeButton from '../../assets/activeHomeButton.png';
import lectureButton from '../../assets/lectureButton.png';
import activeLectureButton from '../../assets/lectureGreenIcon.png';
import boardButton from '../../assets/boardButton.png';
import activeBoardButton from '../../assets/activeBoardButton.png';
import activeCurriButton from '../../assets/activeCurriButton.png';
import curriButton from '../../assets/curriButton.png';
import "./LowBar.css";

export default function LowBar() {
  const navigate = useNavigate();

  const [isButtonClicked, setIsButtonClicked] = useState({
    homeButton: false,
    lectureButton: false,
    boardButton: false,
    curriButton: false
  });

  const handleLowButtonClick = (e, path) => {
    
    setIsButtonClicked(state => {
      for (const button in state) {
          state[button] = false;
      }

      return {
        ...state,
        [e.target.id]: true
      };
    });
    navigate(path);
  };

  if (window.location.pathname === '/account') return null;
  if (window.location.pathname.includes('/boards/') && window.location.pathname.includes('modify')) return null;
  if (window.location.pathname === '/') return null;
  if (window.location.pathname.includes('/boards/') && window.location.pathname.includes('postwrite')) return null;
  if (window.location.pathname.includes('/lectures/') && window.location.pathname.includes('detail')) return null;
  return (
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
      <div className="curriculum-button" onClick={(e) => handleLowButtonClick(e, '/curriculum')} id="curriButton">
          <div className='curriculum-icon-box' id="curriButton">
            <img id='curriButton' src={isButtonClicked.curriButton ? activeCurriButton : curriButton} alt="" />
          </div>
          <div className={(isButtonClicked.curriButton ? ' active-home-text' : 'home-text')} id="curriButton">커리큘럼</div>
      </div>
      <div className="board-button" onClick={(e) => handleLowButtonClick(e, 'boards')} id="boardButton">
          <div className='board-icon-box' id="boardButton"><img id="boardButton" src={isButtonClicked.boardButton ? activeBoardButton : boardButton} alt=''/></div>
          <div className={(isButtonClicked.boardButton ? ' active-home-text' : 'home-text')} id="boardButton">게시판</div>
      </div>
    </div>
  )
}