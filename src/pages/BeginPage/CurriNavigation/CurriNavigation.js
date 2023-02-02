import './CurriNavigation.css';
import leftSwipeIcon from '../../../assets/leftSideIcon.png';
import rightSwipeIcon from '../../../assets/rightSlideIcon.png';
import { getCurriCreatedAt } from '../../../utils/getCurriCreatedAt';
import { getCurriCompletedAt } from '../../../utils/getCurriCompleteAt';


export default function CurriNavigation(props) {
  const { showPrevCurri, showNextCurri, currentCurriPosition, lastCurriPosition, curri } = props;

  return (
    <>
    {curri &&
      <div className='curri-navigation-container'>
        {currentCurriPosition === 0 ?
          <div className='left-swipe-box'></div> :
          <div className='left-swipe-box' onClick={showPrevCurri}>
              <img src={leftSwipeIcon} alt="" />
          </div>
      }
        <div className='curri-navigation-middle'>
          <div className='curri-navi-title'>{currentCurriPosition === lastCurriPosition ? '' : curri.curriName}</div>
          <div className='curri-when-started'>{currentCurriPosition === lastCurriPosition ? '' : curri.progressRate === 100 ? getCurriCompletedAt(curri.completeAt) :  getCurriCreatedAt(curri.createdAt)}</div>
        </div>
        {currentCurriPosition === lastCurriPosition ?
          <div className='right-swipe-box'></div> :
          <div className='right-swipe-box' onClick={showNextCurri}>
              <img src={rightSwipeIcon} alt="" />
          </div>
        }
      </div>

    }
    
    </>
  );
}