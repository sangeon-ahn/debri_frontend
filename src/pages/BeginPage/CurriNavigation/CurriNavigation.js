import './CurriNavigation.css';
import leftSwipeIcon from '../../../assets/leftSideIcon.png';
import rightSwipeIcon from '../../../assets/rightSlideIcon.png';


export default function CurriNavigation(props) {
  const { showPrevCurri, showNextCurri, currentCurriPosition, lastCurriPosition, curri } = props;

  return (
    <div className='curri-navigation-container'>
      {currentCurriPosition === 0 ?
        <div className='left-swipe-box'></div> :
        <div className='left-swipe-box' onClick={showPrevCurri}>
            <img src={leftSwipeIcon} alt="" />
        </div>
    }
      <div className='curri-navigation-middle'>
        <div className='curri-navi-title'>"자바 첫 걸음"</div>
        <div className='curri-when-started'>2022년 6월 10일에 시작함</div>
      </div>
      {currentCurriPosition === lastCurriPosition ?
        <div className='right-swipe-box'></div> :
        <div className='right-swipe-box' onClick={showNextCurri}>
            <img src={rightSwipeIcon} alt="" />
        </div>
      }
    </div>
  );
}