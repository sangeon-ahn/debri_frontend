import './CurriChapter.css';
import curriStoneOneIcon from '../../../assets/curriStoneOneIcon.png';
import curriStoneTwoIcon from '../../../assets/curriStoneTwoIcon.png';
import curriStoneThreeIcon from '../../../assets/curriStoneThreeIcon.png';
import checkboxBorderGreenIcon from '../../../assets/checkboxBorderIcon.png';
import checkboxInnerIcon from '../../../assets/checkboxInnerIcon.png';
import checkboxBorderIcon from '../../../assets/checkBoxIcon.png';
import { useState } from 'react';
import axios from 'axios';
export default function CurriChapter(props) {
  const {chapter, getCurriList } = props;
  // const [chComplete, setChComplete] = useState(chapter.chComplete);
  const headers = {
    'ACCESS-TOKEN': `${JSON.parse(localStorage.getItem("userData")).jwt}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  const handleCheckboxClick = () => {
    postChapterStatus(chapter.chIdx, chapter.curriIdx, chapter.lectureIdx);
    getCurriList();
  };

  const postChapterStatus = async (chIdx, curriIdx, lectureIdx) => {
    try {
      const response = await axios.patch('/api/curri/chapter/status',
        JSON.stringify({
          chIdx: chIdx,
          curriIdx: curriIdx,
          lectureIdx: lectureIdx
        }),
        { headers }
      );
      console.log(response);
    } catch (e) {
      console.log(e)
    }
  };

  const getStoneImg = (chIdx) => {
    if (chIdx === 1) return curriStoneOneIcon;
    if (chIdx === 2) return curriStoneTwoIcon;
    if (chIdx === 3) return curriStoneThreeIcon;
  };

  const getStoneClass = (chIdx) => {
    if (chIdx === 1) return 'curri-stone-one-box';
    if (chIdx === 2) return 'curri-stone-two-box';
    if (chIdx === 3) return 'curri-stone-three-box';
  };
  console.log(1, getCurriList);
  return (
    <div className='curri-stone-check-one'>
      <div className={getStoneClass(chapter.chIdx)}>
        <img src={getStoneImg(chapter.chIdx)} alt="" />
      </div>
      <div className='curri-chapter'>
        <div className='curri-chapter-checkbox' onClick={handleCheckboxClick}>
          {chapter.chComplete === 'FALSE' ?
              <img src={checkboxBorderIcon} alt="" className='checkbox-border-icon' />
            :
            <>
              <img src={checkboxBorderGreenIcon} alt="" className='checkbox-border-icon' />
              <img src={checkboxInnerIcon} alt="" className='checkbox-inner-icon'/>
            </>
          }
        </div>
        <div className='curri-chapter-text'>
          <div className='curri-chapter-subject'>{chapter.langTag}</div>
          <div className='curri-chapter-main'>{chapter.chName}</div>
        </div>
        <div className={chapter.chComplete === 'FALSE' ? 'curri-not-done' : 'curri-done'}>{chapter.chIdx}/3</div>
      </div>
    </div>
  )
}