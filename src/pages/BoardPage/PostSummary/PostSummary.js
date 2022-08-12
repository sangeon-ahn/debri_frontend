import './PostSummary.css';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import grayHeart from '../../../assets/grayHeart.png';
import greenHeart from '../../../assets/greenHeart.png';
import { getTimeAfterCreated } from '../../../utils/getTimeAfterCreated';

export default function PostSummary(props) {
  const { post, boardName } = props;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const scrapped = searchParams.get('scrapped');

  return (
    <div className="post-summary-container">
      <div className='post-likes'>
        {post.likeStatus === 'LIKE' ?
        <>
          <div className='post-like-number like-number-white'>{post.likeNumber}</div>
          <img className='post-like-green-icon' src={greenHeart} alt=''/>
        </>:
        <>
          <div className='post-like-number'>{post.likeNumber}</div>
          <img className='post-like-gray-icon' src={grayHeart} alt=''/>
        </>
        }
      </div>
      <div className='post-summary-wrapper' onClick={() => navigate(`/boards/${post.boardIdx}/${post.postIdx}?scrapped=${scrapped}`, { state: {boardName: boardName} })} >
        <div className='post-summary'>
          <div className='post-title'>{post.postName}</div>
          <div className='comment-number'>({post.commentNumber})</div>
        </div>
        <div className='elapsed-time'>{getTimeAfterCreated(post.timeAfterCreated)}</div>
      </div>
    </div>
  )
}
