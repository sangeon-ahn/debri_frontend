import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import homeButton from '../../assets/homeButton.png';
import activeHomeButton from '../../assets/activeHomeButton.png';
import lectureButton from '../../assets/lectureButton.png';
// import activeLectureButton from '../../assets/activeLectureButton.png';
import boardButton from '../../assets/boardButton.png';
import activeBoardButton from '../../assets/activeBoardButton.png';
import menuButton from '../../assets/menuButton.png';
// import activeMenuButton from '../../assets/activeMenuButton.png';
import curriculum1 from '../../assets/curriculumImg1.png';
import curriculum2 from '../../assets/curriculumImg2.png';
import "./LowBar.css";
import lectureIcon1 from '../../assets/lectureIcon1.png';
import lectureIcon2 from '../../assets/lectureIcon2.png';
import lectureIcon3 from '../../assets/lectureIcon3.png';

export default function LowBar() {
  const navigate = useNavigate();

  const [isButtonClicked, setIsButtonClicked] = useState({
    homeButton: false,
    lectureButton: false,
    boardButton: false,
    menuButton: false
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
            {isButtonClicked.lectureButton ?
                <div className='active-lecture-menu'>
                  <div className='active-lecture-icon-box'>
                    <img className='' src={lectureIcon1} alt="" />
                  </div>
                  <div className='active-lecture-icon-box'>
                    <img src={lectureIcon2} alt="" />
                  </div>
                  <div className='active-lecture-icon-box'>
                    <img src={lectureIcon3} alt="" />
                  </div>
                </div> :
                <img id="lectureButton" src={lectureButton} alt=''/>}
          </div>
          <div className={(isButtonClicked.lectureButton ? ' active-home-text' : 'home-text')} id='lectureButton'>강의</div>
      </div>
      <div className="curriculum-button" onClick={(e) => handleLowButtonClick(e, '/curriculum')} id="menuButton">
          <div className='curriculum-icon-box' id="menuButton">
              {isButtonClicked.menuButton ?
                <div className='curriculum-icons-box'>
                  <div><img className='curriculum-icon1' src={curriculum1} alt="" /></div>
                  <div><img src={curriculum2} alt="" /></div>
                </div> :
                <div className='curriculum-icons-box'>
                  <div><img className='curriculum-icon1' src={curriculum1} alt="" /></div>
                  <div><img src={curriculum2} alt="" /></div>
                </div>
              }
          </div>
          <div className={(isButtonClicked.menuButton ? ' active-home-text' : 'home-text')} id="menuButton">커리큘럼</div>
      </div>
      <div className="board-button" onClick={(e) => handleLowButtonClick(e, 'boards')} id="boardButton">
          <div className='board-icon-box' id="boardButton"><img id="boardButton" src={isButtonClicked.boardButton ? activeBoardButton : boardButton} alt=''/></div>
          <div className={(isButtonClicked.boardButton ? ' active-home-text' : 'home-text')} id="boardButton">게시판</div>
      </div>
    </div>
  )
}