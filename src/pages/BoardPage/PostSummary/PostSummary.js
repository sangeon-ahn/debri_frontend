import './PostSummary.css';
import { useLocation, useNavigate } from 'react-router-dom';
// import grayHeart from './src/assets/grayHeart.png';

export default function PostSummary(props) {
  const { post, boardId } = props;
  const slicedTitle = (post.postName !==null && post.postName.length >= 20) ? post.postName.slice(0, 20) + '...' : post.postName
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  return (
    <div className="post-summary-container">
      <div className='post-likes'>
        <div>{post.likeNumber}</div>
        {/* <img src={grayHeart} alt=''>{post.likeNumber}</img> */}
      </div>
      <div className='post-summary-wrapper' onClick={() => navigate(`/boards/${boardId}/${post.id}`, {state: {post, board: location.state.board}} )}>
        <div className='post-summary'>
          <div className='post-title'>{slicedTitle}</div>
          <div className='comment-number'>({post.commentNumber})</div>
        </div>
        <div className='elapsed-time'>방금</div>
      </div>
    </div>
  )
}



