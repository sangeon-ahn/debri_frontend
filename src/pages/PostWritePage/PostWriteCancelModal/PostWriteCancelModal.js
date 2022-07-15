import React from 'react';
import Modal from 'react-modal';
import './PostWriteCancelModal.css';
import { useNavigate } from 'react-router-dom';
import alertIcon from '../../../assets/alertIcon.png';

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
console.log(Modal.defaultStyles.overlay);
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

console.log(Modal.defaultStyles.overlay);
export default function PostWriteCancelModal(props) {
  const { isCancelModalOpen, closeCancelModal } = props;
  const navigate = useNavigate();
  
  return (
    <div>
      <Modal
        closeTimeoutMS={300}
        isOpen={isCancelModalOpen}
        onRequestClose={() => closeCancelModal()}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className='cancel-title'>
            <div className='alert-icon-box'>
              <img src={alertIcon} alt='' className='alert-icon' />
            </div>
          <span>정말 작성을 취소하시겠어요?</span>
          </div>
          <div className='yesno-box'>
            <button className='cancel-yes-button' onClick={() => navigate(-1)}>네</button>
            <button className='cancel-no-button' onClick={() => closeCancelModal()}>아니오</button>
          </div>
      </Modal>
    </div>
  );
}