import './CurriSettingModal.css';
import Modal from 'react-modal';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function CurriSettingModal(props) {
  const { isOpen, onRequestClose, handleModalCloseClick, patchCurriVisibility, curri, renameCurri, resetModalControl, setPublicSnackbarOpen, setPrivateSnackbarOpen, deleteModalControl} = props;
  const navigate = useNavigate();
  const { jwt } = JSON.parse(localStorage.getItem('userData'));
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px',
      position: 'absolute',
      WebkitOverflowScrolling: 'touch',
      outline: 'none',
      width: '316px',
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

  const headers = {
    'ACCESS-TOKEN': jwt,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  const handleVisibility = () => {
    if (curri.visibleStatus === "INACTIVE") {
      setPublicSnackbarOpen(true);
    } else if (curri.visibleStatus === 'ACTIVE') {
      setPrivateSnackbarOpen(true);
    }
    patchCurriVisibility(curri.curriIdx, curri.visibleStatus);
  }

Modal.setAppElement('#root');
  return (
    <Modal
      closeTimeoutMS={300}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
    <div className="post-setting-container">
      <div className="post-report-detail">
        <div className="post-setting-modal-title">커리큘럼 설정 변경</div>
        <div className="ad-spam-report" onClick={handleVisibility}>{curri.visibleStatus === 'ACTIVE' ? '비공개로 전환하기' : '공개로 전환하기'}</div>
        <div className="fish" onClick={renameCurri}>커리큘럼 이름 변경하기</div>
        <div className="reset-curri" onClick={resetModalControl}>커리큘럼 초기화하기</div>
        <div className="delete-curri" onClick={deleteModalControl}>커리큘럼 삭제하기</div>
      </div>
      <button className="post-setting-cancel-container" onClick={handleModalCloseClick}>닫기</button>
    </div>
    </Modal>
  );
}
