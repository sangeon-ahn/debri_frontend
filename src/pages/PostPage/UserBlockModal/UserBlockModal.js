import React, { useState } from 'react';
import Modal from 'react-modal';
import './UserBlockModal.css';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import alertIcon from '../../../assets/alertIcon.png';
import alertBellIcon from '../../../assets/alertBellIcon.png';
import axios from 'axios';

export default function UserBlockModal(props) {
  const { isOpen, onRequestClose, setReportSnackbarOpen } = props;
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const scrapped = searchParams.get('scrapped');
  const [error, setError] = useState(null);
  console.log(params);
  const customStyles = {
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    height: "110px",
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
const { jwt } = JSON.parse(localStorage.getItem('userData'));
  const headers = {
    'ACCESS-TOKEN': jwt,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  const postBlockUser = async (postIdx, reason) => {
    try {
      const response = await axios.post(`${baseUrl}/api/report/user/${postIdx}`,
        JSON.stringify({
          reason: reason
        }),
      { headers });
      console.log(response);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const handleBackClick = () => {
    onRequestClose();
    setReportSnackbarOpen(true);
    postBlockUser(params.postId, '');
  };

  if (error) return null;

  return (
    <div>
      <Modal
        closeTimeoutMS={300}
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className='cancel-title'>
          <div className='alert-icon-box'>
            <img src={alertBellIcon} alt='' className='alert-icon' />
          </div>
          <div style={{marginTop: '15px'}}>
            <div className='user-block-text'>신고가 접수되었습니다.</div>
            <div className='user-block-text'>신고한 유저를 차단하시겠어요?</div>
          </div>
        </div>
          <div className='user-block-yesno-box'>
            <button className='cancel-yes-button' onClick={handleBackClick}>네</button>
            <button className='cancel-no-button' onClick={onRequestClose}>아니오</button>
          </div>
      </Modal>
    </div>
  );
}