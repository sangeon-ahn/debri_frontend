import React from 'react';
import Modal from 'react-modal';
import './PostModifyConfirmModal.css';
import { useNavigate } from 'react-router-dom';
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
    height: '86px'
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)




export default function PostWriteConfirmModal(props) {
  const { isConfirmModalOpen, closeConfirmModal, postContent, postIdx } = props;
  const navigate = useNavigate();

  const headers = {
    'ACCESS-TOKEN': 'eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWR4IjoyLCJpYXQiOjE2NTg4MzMxMTcsImV4cCI6NTk3MTc5OTIyNDA2OTIwMH0.9x_GVpPVxJhBl3pdNB93uEaJEMUDbH2_rV_Rsz5fLRw',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const modifyPost = async (userIdx, postContent, postIdx) => {
    try {
      const response = axios.patch(`/api/post/${postIdx}`,
        JSON.stringify(
          {
            userIdx: userIdx,
            postContent: postContent
          }),
          { headers }
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
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
          <span>"C언어" 게시판에 작성하시겠어요?</span>
        </div>
        <div className='yesno-box'>
          <button className='confirm-yes-button' onClick={() => {
            modifyPost(2, postContent, postIdx);
            navigate(-1);
          }}>네</button>
          <button className='confirm-no-button' onClick={() => closeConfirmModal()}>아니오</button>
        </div>
      </Modal>
    </div>
  );
}