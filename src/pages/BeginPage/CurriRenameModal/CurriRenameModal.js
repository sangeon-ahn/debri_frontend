import './CurriRenameModal.css';
import axios from 'axios';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import greenPencilIcon from '../../../assets/greenPencilIcon.png';

export default function CurriRenameModal(props) {
  const params = useParams();
  const navigate = useNavigate();
  const {isOpen, onRequestClose, setReportSnackbarOpen, getCurriList, curri } = props;
  const customStyles = {
    content: {
      top: '40%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      height: '160px',
      width: '316px',
      background: '#D9D9D9',
      boxSizing:'border-box',
      padding: '15px 18px 13px 18px',
      borderRadius: '10px'
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
  const { jwt } = JSON.parse(localStorage.getItem('userData'));
  const headers = {
    'ACCESS-TOKEN': jwt,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  const [curriName, setCurriName] = useState('');
  const handleReasonChange = (e) => {
    setCurriName(e.target.value);
  };

  const handleRename = () => {
    const renameCurri = async (curriIdx, curriName) => {
      const response = await axios.patch(`/api/curri/modify/name`,
        JSON.stringify({
          curriIdx: curriIdx,
          curriName: curriName
        }),
        { headers });
        console.log(response);
    };
    onRequestClose();
    renameCurri(curri.curriIdx, curriName);
    // setReportSnackbarOpen(true);
    getCurriList();
  };

  const handleRenameCancel = () => {
    onRequestClose();
  };


  return (
    <Modal
      closeTimeoutMS={300}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      <div className='curri-rename-title-box'>
        <div className='curri-rename-icon-box'>
          <img src={greenPencilIcon} alt="" className='report-alert-icon'/>
        </div>
        <div className='report-reason-title'>변경할 이름을 적어주세요!</div>
      </div>
      <textarea
        className='curri-rename-textarea'
        onChange={handleReasonChange}
        value={curriName}
        maxLength='144'
        autoFocus={true}
        spellCheck={false}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleRename();
          }
        } }
      />
      <div className='report-reason-button-box'>
        <button className='curri-rename-submit' onClick={handleRename}>네</button>
        <button className='curri-rename-cancel' onClick={handleRenameCancel}>취소하기</button>
      </div>
    </Modal>
  )
}