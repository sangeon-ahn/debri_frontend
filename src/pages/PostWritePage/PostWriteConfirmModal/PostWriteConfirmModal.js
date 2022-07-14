import './PostWriteConfirmModal.css';
import confirmIcon from '../../../assets/confirmIcon.png';

export default function PostWriteConfirmModal() {
  return (
    <div className='post-write-confirm-modal'>
      <div className='confirm-title'>
        <div className='confirm-icon-box'>
          <img src={confirmIcon} alt='' className='confirm-icon' />
        </div>
        <span>"C언어" 게시판에 작성하시겠어요?</span>
      </div>
      <div className='yesno-box'>
        <button className='confirm-yes-button'>네</button>
        <button className='confirm-no-button'>아니오</button>
      </div>
    </div>
  )
}