import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import homeButton from '../../assets/homeButton.png';
import activeHomeButton from '../../assets/activeHomeButton.png';
import lectureButton from '../../assets/lectureButton.png';
// import activeLectureButton from '../../assets/activeLectureButton.png';
import boardButton from '../../assets/boardButton.png';
import activeBoardButton from '../../assets/activeBoardButton.png';
import menuButton from '../../assets/menuButton.png';
// import activeMenuButton from '../../assets/activeMenuButton.png';

import "./LowBar.css";

export default function LowBar() {
  const [isButtonClicked, setIsButtonClicked] = useState({
    homeButton: false,
    lectureButton: false,
    boardButton: false,
    menuButton: false
  });

  const handleLowButtonClick = (e) => {
    setIsButtonClicked(state => {
      for (const button in state) {
          state[button] = false;
      }

      return {
        ...state,
        [e.target.id]: true
      };
    });
  };

  return (
    <div className="low-bar">
      <div className="home-button" onClick={handleLowButtonClick} id="homeButton">
        <NavLink to={'/'}>
          <div className='home-icon-box' id="homeButton"><img src={isButtonClicked.homeButton ? activeHomeButton : homeButton} alt='' id="homeButton"/></div>
          <div className={(isButtonClicked.homeButton ? ' active-home-text' : 'home-text')} id="homeButton">홈</div>
        </NavLink>
      </div>
      <div className="lecture-button" onClick={handleLowButtonClick} id="lectureButton">
        <NavLink to={'/lectures'}>
          <div className='lecture-icon-box' id="lectureButton"><img src={isButtonClicked.lectureButton ? lectureButton : lectureButton} alt='' id='lectureButton'/></div>
          <div className={(isButtonClicked.lectureButton ? ' active-home-text' : 'home-text')} id='lectureButton'>강의</div>
        </NavLink>
      </div>
      <div className="board-button" onClick={handleLowButtonClick} id="boardButton">
        <NavLink to={'/boards'}>
          <div className='board-icon-box' id="boardButton"><img id="boardButton" src={isButtonClicked.boardButton ? activeBoardButton : boardButton} alt=''/></div>
          <div className={(isButtonClicked.boardButton ? ' active-home-text' : 'home-text')} id="boardButton">게시판</div>
        </NavLink>
      </div>
      <div className="menu-button" onClick={handleLowButtonClick} id="menuButton">
        <NavLink to={'/postwrite'}>
          <div className='menu-icon-box' id="menuButton"><img id="menuButton" src={isButtonClicked.menuButton ? menuButton : menuButton} alt=''/></div>
          <div className={(isButtonClicked.menuButton ? ' active-home-text' : 'home-text')} id="menuButton">메뉴</div>
        </NavLink>
      </div>
    </div>
  )
}