import './PostSummary.css';
import { useLocation, useNavigate } from 'react-router-dom';
import grayHeart from '../../../assets/grayHeart.png';

export default function PostSummary(props) {
  const { post, state } = props;
  const slicedTitle = (post.postName !==null && post.postName.length >= 20) ? post.postName.slice(0, 20) + '...' : post.postName
  const navigate = useNavigate();
  
  return (
    <div className="post-summary-container">
      <div className='post-likes'>
        <div className='post-like-number'>{post.likeNumber}</div>
        <img className='post-like-gray-icon' src={grayHeart} alt=''/>
      </div>
      <div className='post-summary-wrapper' onClick={() => navigate(`/boards/${post.boardIdx}/${post.postIdx}`, { state })} >
        <div className='post-summary'>
          <div className='post-title'>{slicedTitle}</div>
          <div className='comment-number'>({post.commentNumber})</div>
        </div>
        <div className='elapsed-time'>방금</div>
      </div>
    </div>
  )
}
