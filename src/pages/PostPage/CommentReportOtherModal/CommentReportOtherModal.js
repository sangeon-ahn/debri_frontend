import { useState } from 'react';
import Modal from 'react-modal';
import reportAlertIcon from '../../../assets/reportAlertIcon.png';
import './CommentReportOtherModal.css';

export default function CommentReportOtherModal(props) {
  const {isOpen, onRequestClose, setReportSnackbarOpen, handleReportComment, reportedComment } = props;
  const customStyles = {
    content: {
      top: '40%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      height: '230px',
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


  const [reason, setReason] = useState('');
  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleReportCancel = () => {
    onRequestClose();
  };

  return (
    <Modal
      closeTimeoutMS={300}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      <div className='report-reason-title-box'>
        <img src={reportAlertIcon} alt="" className='report-alert-icon'/>
        <div className='report-reason-title'>신고 사유를 적어주세요!</div>
      </div>
      <textarea
        className='report-reason-textarea'
        onChange={handleReasonChange}
        value={reason}
        maxLength='144'
        spellCheck='false'
      />
      <div className='report-reason-button-box'>
        <button className='report-reason-submit' onClick={(e) => {
          handleReportComment(e, reportedComment.commentIdx, reason);
          onRequestClose();
        }}>네</button>
        <button className='report-reason-cancel' onClick={handleReportCancel}>아니오</button>
      </div>
    </Modal>
  )
}