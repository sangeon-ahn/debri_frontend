import './CurriLecture.css';
import curriLectureDetailIcon from '../../../assets/curriLectureDetailIcon.png';

export default function CurriLecture(props) {
  const { lecture } = props;
  const greenProgressBarStyle = {
    boxSizing: 'border-box',
    width: (lecture.progressRate / 100 * 146) + 'px',
    height: '17px',
    background: '#66CC66',
    borderRadius: '14px',
    border: '2px solid #66CC66',
    visibility: lecture.progressRate === 0 ? 'hidden' : 'visible',
  };
  const getLectureChapter = (chapterNumber) => {
    if (lecture.chComplete === 'TRUE') {
      return '완료';
    }

    return `(1강 - ${chapterNumber}강)`;
  };

  return (
    <div className={lecture.progressRate === 100 ? 'curri-lecture-completed' :'curri-lecture'}>
      <div className={lecture.progressRate === 100 ? 'lecture-progress-ratio-completed' :'lecture-progress-ratio'}>{Math.floor(lecture.progressRate)}%</div>
      <div className='lecture-vertical-line'></div>
      <div className='curri-lecture-main'>
        <div className='curri-lecture-main-text'>
          <div className='curri-lecture-subject'>{lecture.langTag}</div>
          <div className='curri-lecture-title'>"{lecture.lectureName}"</div>
        </div>
        <div className='curri-lecture-progress-box'>
          <div className='curri-lecture-progress-bar' >
            <div className='curri-lecture-progress-green' style={greenProgressBarStyle}></div>
          </div>
          <div className='curri-lecture-progress-text'>{getLectureChapter(lecture.chNumber)}</div>
        </div>
      </div>
      <div className='curri-lecture-detail'>
        <div className='curri-lecture-detail-box'>
          <img src={curriLectureDetailIcon} alt="" />
        </div>
      </div>
    </div>
  )
}