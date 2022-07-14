import './PostWriteCancelModal.css';
import alertIcon from '../../../assets/alertIcon.png';

export default function PostWriteCancelModal() {
  return (
    <div className='post-write-cancel-modal'>
      <div className='cancel-title'>
        <div className='alert-icon-box'>
          <img src={alertIcon} alt='' className='alert-icon' />
        </div>
        <span>정말 작성을 취소하시겠어요?</span>
      </div>
      <div className='yesno-box'>
        <button className='cancel-yes-button'>네</button>
        <button className='cancel-no-button'>아니오</button>
      </div>
    </div>
  )
}