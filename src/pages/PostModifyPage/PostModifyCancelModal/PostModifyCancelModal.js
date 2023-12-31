import React from 'react';
import Modal from 'react-modal';
import './PostModifyCancelModal.css';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import alertIcon from '../../../assets/alertIcon.png';

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

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)


console.log(Modal.defaultStyles.overlay);
export default function PostWriteCancelModal(props) {
  const { isCancelModalOpen, closeCancelModal, boardName } = props;
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const scrapped = searchParams.get('scrapped');

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
          <span>정말 수정을 취소하시겠어요?</span>
          </div>
          <div className='yesno-box'>
            <button className='cancel-yes-button' onClick={() => navigate(`/boards/${params.boardId}/${params.postId}?scrapped=${scrapped}`, {state: {boardName: boardName}})}>네</button>
            <button className='cancel-no-button' onClick={() => closeCancelModal()}>아니오</button>
          </div>
      </Modal>
    </div>
  );
}