import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './PostModifyConfirmModal.css';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import confirmIcon from '../../../assets/confirmIcon.png';
import axios from 'axios';

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




export default function PostWriteConfirmModal(props) {
  const { isConfirmModalOpen, closeConfirmModal, postContent, boardName } = props;
  const navigate = useNavigate();
  const { userIdx, userName, userId, userBirthday, jwt, refreshToken } = JSON.parse(localStorage.getItem('userData'));
  const params = useParams();
  console.log(params);
  const [isModified, setIsModified] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const scrapped = searchParams.get('scrapped');
  const headers = {
    'ACCESS-TOKEN': jwt,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const baseUrl = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    if (!isModified) return;
    navigate(`/boards/${params.boardId}/${params.postId}?scrapped=${scrapped}`, {state: {boardName: boardName}});
  }, [isModified]);

  const modifyPost = async (userIdx, postContent, postIdx) => {
    try {
      const response = axios.patch(`${baseUrl}/api/post/${postIdx}`,
        JSON.stringify(
          {
            userIdx: userIdx,
            postContent: postContent
          }),
          { headers }
      );
      console.log(response.data);
      setIsModified(true);
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
          <span>"수정하시겠어요?"</span>
        </div>
        <div className='yesno-box'>
          <button className='confirm-yes-button' onClick={() => {
            modifyPost(userIdx, postContent, params.postId);
          }}>네</button>
          <button className='confirm-no-button' onClick={() => closeConfirmModal()}>아니오</button>
        </div>
      </Modal>
    </div>
  );
}