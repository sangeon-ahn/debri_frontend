import React from 'react';
import Modal from 'react-modal';
import './PostWriteConfirmModal.css';
import { useNavigate } from 'react-router-dom';
import confirmIcon from '../../../assets/confirmIcon.png';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');
Modal.defaultStyles.overlay = {
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  bottom: 0,
  left: 0,
  position: "fixed",
  right: 0,
  top: 0,
  zIndex: 99
}
Modal.defaultStyles.content = {
  position: 'absolute',
  top: '40px',
  left: '40px',
  right: '40px',
  bottom: '40px',
  WebkitOverflowScrolling: 'touch',
  outline: 'none',
  width: '316px',
  height: '86px',
  backgroundColor: '#D9D9D9',
  borderRadius: '10px',
}

export default function PostWriteConfirmModal(props) {
  const { isConfirmModalOpen, closeConfirmModal } = props;
  const navigate = useNavigate();

  return (
    <div>
      <Modal
        closeTimeoutMS={300}
        isOpen={isConfirmModalOpen}
        onRequestClose={() => closeConfirmModal()}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className='confirm-title'>
          <div className='confirm-icon-box'>
            <img src={confirmIcon} alt='' className='confirm-icon' />
          </div>
          <span>"C언어" 게시판에 작성하시겠어요?</span>
        </div>
        <div className='yesno-box'>
          <button className='confirm-yes-button' onClick={() => navigate(-1)}>네</button>
          <button className='confirm-no-button' onClick={() => closeConfirmModal()}>아니오</button>
        </div>
      </Modal>
    </div>
  );
}