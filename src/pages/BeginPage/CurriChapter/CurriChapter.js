import './CurriChapter.css';
import curriStoneOneIcon from '../../../assets/curriStoneOneIcon.gif';
import curriStoneTwoIcon from '../../../assets/curriStoneTwoIcon.gif';
import curriStoneThreeIcon from '../../../assets/curriStoneThreeIcon.gif';
import checkboxBorderGreenIcon from '../../../assets/checkboxBorderIcon.png';
import checkboxInnerIcon from '../../../assets/checkboxInnerIcon.png';
import checkboxBorderIcon from '../../../assets/checkBoxIcon.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function CurriChapter(props) {
  const {chapter, getCurriList } = props;
  const [mainFontSize, setMainFontSize] = useState(14);
  const [error, setError] = useState(null);

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
      console.log(e);
      setError(e);
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

  const mainStyle = {
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: mainFontSize,
    lineHeight: '20px',
    color: '#FFFFFF',
    paddingRight: '10px',
    boxSizing: 'border-box',
  };


  useEffect(() => {
    const $ChapterMain = document.querySelector(`.curri-stone-checks > div:nth-child(${chapter.chIdx}) .curri-chapter-main`);
  
    console.log($ChapterMain);

    if ($ChapterMain !== null && $ChapterMain.clientHeight > 20) {
      setMainFontSize(state => state - 1);
    }
  }, [mainFontSize]);

  if (error) return null;

  return (
    <div className='curri-stone-check-one'>
      <div className={getStoneClass(chapter.chIdx)}>
        <img src={getStoneImg(chapter.chIdx)} alt="" className='chapter-stone-icon'/>
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
          <div style={mainStyle} className='curri-chapter-main'>{chapter.chName}</div>
        </div>
        <div className={chapter.chComplete === 'FALSE' ? 'curri-not-done' : 'curri-done'}>{chapter.chIdx}/3</div>
      </div>
    </div>
  )
}