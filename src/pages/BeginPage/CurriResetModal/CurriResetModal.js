import React from 'react';
import Modal from 'react-modal';
import './CurriResetModal.css';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import alertIcon from '../../../assets/alertIcon.png';

export default function CurriResetModal(props) {
  const { isOpen, onRequestClose, getCurriList, curri, resetCurri } = props;
  const navigate = useNavigate();
  const customStyles = {
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    height: "86px",
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#D9D9D9',
    borderRadius: '10px',
    WebkitOverflowScrolling: 'touch',
    outline: 'none',
    width: '316px',
    boxSizing: 'border-box',
    padding: '0px'
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    bottom: 0,
    left: 0,
    position: "fixed",
    right: 0,
    top: 0,
    zIndex: 99
  }
};

  console.log('aa');
  return (
    <div>
      <Modal
        closeTimeoutMS={300}
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
      >
        <div className='cancel-title'>
            <div className='alert-icon-box'>
              <img src={alertIcon} alt='' className='alert-icon' />
            </div>
          <span>정말 커리큘럼을 초기화하시겠어요?</span>
          </div>
          <div className='yesno-box'>
            <button className='cancel-yes-button' onClick={() => resetCurri(curri.curriIdx)}>네</button>
            <button className='cancel-no-button' onClick={onRequestClose}>아니오</button>
          </div>
      </Modal>
    </div>
  );
}