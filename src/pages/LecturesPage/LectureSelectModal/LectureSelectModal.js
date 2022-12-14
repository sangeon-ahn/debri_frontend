import './LectureSelectModal.css';
import Modal from 'react-modal';
import { useEffect } from 'react';
import keywordMinusIcon from '../../../assets/keywordMinusIcon.png';
import keywordPlusIcon from '../../../assets/keywordPlusIcon.png';
import bookIcon from '../../../assets/bookIcon.png';
import bookGreenIcon from '../../../assets/bookGreenIcon.png';
import videoIcon from '../../../assets/videoIcon.png';
import videoGreenIcon from '../../../assets/videoGreenIcon.png';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function LectureSelectModal(props) {
  const { isOpen, onRequestClose,subject, material, pricing, handleSubjectClick, handleTypeClick, handlePriceClick } = props;

  const customStyles = {
    content: {
      top: '55%',
      left: '59%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px',
      position: 'absolute',
      WebkitOverflowScrolling: 'touch',
      outline: 'none',
      width: '320px',
      backgroundColor:'transparent',
      border: 'none'
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      bottom: 0,
      left: 0,
      position: "fixed",
      right: 0,
      top: 0,
      zIndex: 99
    }
  };

  Modal.setAppElement('#root');
  return (
    <Modal
      closeTimeoutMS={300}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
    <div className="keywords-modal-container">
      <div className='setting'>카테고리 설정</div>

      <div className='sub-setting'>학습 목표 언어</div>
      <div className="keywords-subject-modal-container">
        <button className={subject === 'Front' ? 'keyword red' : 'keyword'} onClick={() => handleSubjectClick('Front')}>
          <div>Front</div>
          {subject === 'Front' ?
            <img className="keyword-minus-icon" src={keywordMinusIcon} alt="" onClick={() => handleSubjectClick('Front')}/> :
            <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" onClick={() => handleSubjectClick('Front')}/>
          }
        </button> 
        <button className={subject === 'Back' ? 'keyword green' : 'keyword'} onClick={() => handleSubjectClick('Back')}>
          <div>Back</div>
          {subject === 'Back' ?
            <img className="keyword-minus-icon" src={keywordMinusIcon} alt=""  onClick={() => handleSubjectClick('Back')}/> :
            <img className="keyword-plus-icon" src={keywordPlusIcon} alt=""  onClick={() => handleSubjectClick('Back')}/>
          }
        </button> 
        <button className={subject === 'Python' ? 'keyword blue': 'keyword'} onClick={() => handleSubjectClick("Python")}>
          <div>Python</div>
          {subject === 'Python' ?
            <img className="keyword-minus-icon" src={keywordMinusIcon} alt="" onClick={() => handleSubjectClick("Python")}/> :
            <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" onClick={() => handleSubjectClick("Python")}/>
          }
        </button>
        <button className={subject === 'C 언어' ? 'keyword gray': 'keyword'} onClick={() => handleSubjectClick('C 언어')}>
          <div>C 언어</div>
          {subject === 'C 언어' ?
            <img className="keyword-minus-icon" src={keywordMinusIcon} alt="" onClick={() => handleSubjectClick('C 언어')} /> :
            <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" onClick={() => handleSubjectClick('C 언어')} />
          }
        </button>
      </div>
      <div className='sub-setting'>강의 매체</div>
      <div className="keywords-material-modal-container">
        <button className={material === '서적' ? 'material active': 'material'} onClick={() => handleTypeClick('서적')}>
          {material === '서적' ?
            <img className="book-green-icon" src={bookGreenIcon} alt="" onClick={() => handleTypeClick('서적')} /> :
            <img className="book-icon" src={bookIcon} alt="" onClick={() => handleTypeClick('서적')} />
          }
          <div>서적</div>
        </button>
        <button className={material === '영상' ? 'material active': 'material'} onClick={() => handleTypeClick('영상')}>
          {material === '영상' ?
            <img className="video-green-icon" src={videoGreenIcon} alt="" onClick={() => handleTypeClick('영상')} /> :
            <img className="video-icon" src={videoIcon} alt="" onClick={() => handleTypeClick('영상')} />
          }
          <div>영상</div>
        </button>
      </div>
      <div className="keywords-pricing-modal-container">
        <div className='sub-setting'>유/무료</div>
        <button className={pricing === '무료' ? 'pricing active': 'pricing'} onClick={() => handlePriceClick('무료')}>
          무료
        </button>
        <button className={pricing === '유료' ? 'pricing active': 'pricing'} onClick={() => handlePriceClick('유료')}>
          유료
        </button>
      </div>
      <button className='ok-button' onClick={onRequestClose}>확정하기</button>
    </div>
    </Modal>
  );
}
