import './CurriMain.css';
import curriPrivateIcon from '../../../assets/curriPrivateIcon.png';
import curriOptionIcon from '../../../assets/curriOptionIcon.png';
import curriStoneOneIcon from '../../../assets/curriStoneOneIcon.png';
import checkboxBorderIcon from '../../../assets/checkboxBorderIcon.png';
import checkboxInnerIcon from '../../../assets/checkboxInnerIcon.png';
import curriStoneTwoIcon from '../../../assets/curriStoneTwoIcon.png';
import curriStoneThreeIcon from '../../../assets/curriStoneThreeIcon.png';
import curriLectureDetailIcon from '../../../assets/curriLectureDetailIcon.png';
import BeginCurriButton from '../BeginCurriButton/BeginCurriButton';

export default function CurriMain(props) {
  const { curri, currentCurriPosition, numberOfCurries } = props;
  console.log(curri, currentCurriPosition, numberOfCurries);

  return (
    <>
      {currentCurriPosition !== numberOfCurries ? 
      <>
        <div className='curri-sub-info'>
          <div className='curri-private'>
            <div className='curri-private-img-box'>
              <img src={curriPrivateIcon} alt="" />
            </div>
            <div className='curri-private-text'>비공개</div>
          </div>
          <div className='dday-achieved-container'>
            <div className='dday'>D- 00</div>
            <div className='horizontal-line'></div>
            <div className='achieved-rate'>
              <div className='achieved-text'>달성률</div>
              <div className='achieved-number'>100</div>
              <div className='percent'>%</div>
            </div>
          </div>
          <div className='curri-option'>
            <img src={curriOptionIcon} alt="" />
          </div>
        </div>
        <div className='curri-middle-area'>
          <div className='curri-green-circle-border'></div>
          <div className='curri-green-circle-inner'></div>
          <div className='curri-stone-checks'>
            <div className='curri-stone-check-one'>
              <div className='curri-stone-one-box'>
                <img src={curriStoneOneIcon} alt="" />
              </div>
              <div className='curri-chapter'>
                <div className='curri-chapter-checkbox'>
                  <img src={checkboxBorderIcon} alt="" className='checkbox-border-icon' />
                  <img src={checkboxInnerIcon} alt="" className='checkbox-inner-icon'/>
                </div>
                <div className='curri-chapter-text'>
                  <div className='curri-chapter-subject'>Front</div>
                  <div className='curri-chapter-main'>자바의 정석 (완료)</div>
                </div>
                <div className='curri-done'>3/3</div>
              </div>
            </div>
            <div className='curri-stone-check-one'>
              <div className='curri-stone-two-box'>
                <img src={curriStoneTwoIcon} alt="" />
              </div>
              <div className='curri-chapter'>
                <div className='curri-chapter-checkbox'>
                  <img src={checkboxBorderIcon} alt="" className='checkbox-border-icon' />
                  <img src={checkboxInnerIcon} alt="" className='checkbox-inner-icon'/>
                </div>
                <div className='curri-chapter-text'>
                  <div className='curri-chapter-subject'>Front</div>
                  <div className='curri-chapter-main'>자바의 정석 (완료)</div>
                </div>
                <div className='curri-done'>3/3</div>
              </div>
            </div>
            <div className='curri-stone-check-one'>
              <div className='curri-stone-three-box'>
                <img src={curriStoneThreeIcon} alt="" />
              </div>
              <div className='curri-chapter'>
                <div className='curri-chapter-checkbox'>
                  <img src={checkboxBorderIcon} alt="" className='checkbox-border-icon' />
                  <img src={checkboxInnerIcon} alt="" className='checkbox-inner-icon'/>
                </div>
                <div className='curri-chapter-text'>
                  <div className='curri-chapter-subject'>Front</div>
                  <div className='curri-chapter-main'>자바의 정석 (완료)</div>
                </div>
                <div className='curri-done'>3/3</div>
              </div>
            </div>
          </div>
          <div className='curri-lectures'>
            <div className='curri-lecture'>
              <div className='lecture-progress-ratio'>100%</div>
              <div className='lecture-vertical-line'></div>
              <div className='curri-lecture-main'>
                <div className='curri-lecture-main-text'>
                  <div className='curri-lecture-subject'>Front</div>
                  <div className='curri-lecture-title'>"자바의 정석 2"</div>
                </div>
                <div className='curri-lecture-progress-box'>
                  <div className='curri-lecture-progress-bar'></div>
                  <div className='curri-lecture-progress-text'>완료</div>
                </div>
              </div>
              <div className='curri-lecture-detail'>
                <div className='curri-lecture-detail-box'>
                  <img src={curriLectureDetailIcon} alt="" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </> : <BeginCurriButton />
    }
    </>
  );
}