import './PostWriteCancelModal.css';
import alertIcon from '../../../assets/alertIcon.png';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

export default function PostWriteCancelModal(props) {
  console.log(props);
  const { isCancelModalOpen, closeCancelModal } = props;
  const navigate = useNavigate();

  // 닫힐 때 css 반영이 끝난 이후에 return되어야 함
  // --> setTimeout 사용
  // if (!isCancelModalOpen) {
  //   let timerId = setTimeout(() => {
  //     console.log('hi');
  //   }, 500);
  // };

  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
    }
  }, []);

  return (
    <div className={isCancelModalOpen ? 'modal openModal' : isFirst.current ? 'modal display-none' : 'modal closeModal'}>
        <div className={isCancelModalOpen ? 'post-write-cancel-modal modal-show': 'post-write-cancel-modal modal-close'}>
          <div className='cancel-title'>
            <div className='alert-icon-box'>
              <img src={alertIcon} alt='' className='alert-icon' />
            </div>
          <span>정말 작성을 취소하시겠어요?</span>
          </div>
          <div className='yesno-box'>
            <button className='cancel-yes-button' onClick={() => navigate(-1)}>네</button>
            <button className='cancel-no-button' onClick={() => closeCancelModal()}>아니오</button>
          </div>
        </div>
    </div>
  );
}

