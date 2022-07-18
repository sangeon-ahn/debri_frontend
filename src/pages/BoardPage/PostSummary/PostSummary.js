import './PostSummary.css';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PostSummary(props) {
  const { post, boardId } = props;
  const slicedTitle = post.title.length >= 20 ? post.title.slice(0, 20) + '...' : post.title
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  return (
    <div className="post-summary-container">
      <div className='post-likes'>
      </div>
      <div className='post-summary-wrapper' onClick={() => navigate(`/boards/${boardId}/${post.id}`, {state: {post, board: location.state.board}} )}>
        <div className='post-summary'>
          <div className='post-title'>{slicedTitle}</div>
          <div className='comment-number'>(1)</div>
        </div>
        <div className='elapsed-time'>방금</div>
      </div>
    </div>
  )
}



