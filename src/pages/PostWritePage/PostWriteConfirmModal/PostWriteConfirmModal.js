import React, { useRef, useState } from 'react';
import Modal from 'react-modal';
import './PostWriteConfirmModal.css';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import confirmIcon from '../../../assets/confirmIcon.png';
import axios from 'axios';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: "86px"
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
  const { isConfirmModalOpen, closeConfirmModal, postContent, postTitle, boardId, boardName } = props;
  const navigate = useNavigate();
  const { userIdx, userName, userId, userBirthday, jwt, refreshToken } = JSON.parse(localStorage.getItem('userData'));

  const headers = {
    'ACCESS-TOKEN': jwt,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  
  const postIdxRef = useRef(0);

  async function postData(boardIdx,userIdx,postContent, postName) {
    try {
      const response = await axios.post(`/api/post/create`,
        JSON.stringify({boardIdx,userIdx,postContent, postName}),
        { headers }
      );
      console.log('리턴', response);
      postIdxRef.current = response.data.result.postIdx;
      navigate(`/boards/${boardId}/${postIdxRef.current}`, {state: {boardName: boardName}});
      return true;
    } catch (error) {
      console.error(error);
    }
  }
  
  const uploadPost = () => {
    postData(boardId, userIdx, postContent, postTitle);
  };
  
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
          <span>"{boardName}" 게시판에 작성하시겠어요?</span>
        </div>
        <div className='yesno-box'>
          <button className='confirm-yes-button' onClick={uploadPost}>네</button>
          <button className='confirm-no-button' onClick={() => closeConfirmModal()}>아니오</button>
        </div>
      </Modal>
    </div>
  );
}