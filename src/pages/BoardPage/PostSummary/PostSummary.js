import './PostSummary.css';
import { useLocation, useNavigate } from 'react-router-dom';
import grayHeart from '../../../assets/grayHeart.png';
import greenHeart from '../../../assets/greenHeart.png';

export default function PostSummary(props) {
  const { post } = props;
  const navigate = useNavigate();

  const getTimeAfterCreated = (minute) => {
    if (minute === 0) {
      return '방금';
    }

    if (minute < 60) {
      return String(minute) + '분 전';
    }

    if (minute < 60 * 24) {
      return parseInt(minute / 60) + '시간 전';
    }

    if (minute < 60 * 24 * 30) {
      return parseInt(minute / (60 * 24)) + '일 전';
    }

    if (minute < 60 * 24 * 30 * 12) {
      return parseInt(minute / (60 * 24 * 30)) + '개월 전';
    }
    
    return parseInt(minute / (60 * 24 * 30 * 12)) + '년 전';
  };

  return (
    <div className="post-summary-container">
      <div className='post-likes'>
        {post.likeStatus === 'LIKE' ?
        <>
          <div className='post-like-number white'>{post.likeNumber}</div>
          <img className='post-like-green-icon' src={greenHeart} alt=''/>
        </>:
        <>
          <div className='post-like-number'>{post.likeNumber}</div>
          <img className='post-like-gray-icon' src={grayHeart} alt=''/>
        </>
        }
      </div>
      <div className='post-summary-wrapper' onClick={() => navigate(`/boards/${post.boardIdx}/${post.postIdx}`, { state: {post} })} >
        <div className='post-summary'>
          <div className='post-title'>{post.postName}</div>
          <div className='comment-number'>({post.commentNumber})</div>
        </div>
        <div className='elapsed-time'>{getTimeAfterCreated(post.timeAfterCreated)}</div>
      </div>
    </div>
  )
}
