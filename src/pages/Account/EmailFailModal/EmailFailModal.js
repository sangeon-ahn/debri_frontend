import React from 'react';
import Modal from 'react-modal';
import './EmailFailModal.css';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import alertIcon from '../../../assets/alertIcon.png';

export default function EmailFailModal(props) {
  const { isOpen, onRequestClose } = props;
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
          <div>
            <span>인증코드가 일치하지 않습니다!</span>
            <div style={{fontSize:'12px'}}>다시 입력하거나, 코드를 다시 받아주세요</div>
          </div>
        </div>
      </Modal>
    </div>
  );
}