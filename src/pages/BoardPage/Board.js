import Header from '../Header/Header';
import Search from '../Search/Search';
import './Board.css';
import PostSummary from './PostSummary/PostSummary';
import leftArrow from '../../assets/leftArrow.png';
import { useNavigate, useParams } from 'react-router-dom';
import favoriteStar from '../../assets/favoriteStar.png';
import LowBar from '../LowBar/LowBar';
import pencil from '../../assets/pencil.png';
import writePost from '../../assets/글쓰기.png';

export default function Board() {
  const navigate = useNavigate();
  const params = useParams();
  const boardId = params.boardId;
  
  const boardTitle = {
    1: '파이썬과 관련된 질문을 하고, 답변을 할 수 있는 게시판이에요!'
  };

  // boardId로 api요청해서 게시판 데이터 받은 데이터(지금은 더미 데이터)
  const dummyData = [
    {
      id: 1,
      title: '공백포함(21자35바이트)이상뒤에는 점을 붙인다',
      content: '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용'
    },
    {
      id: 2,
      title: '이거 오류 고치는 법'
    },
    {
      id: 3,
      title: '아이고 맙소사 이게 어떻게 된 일인지 도대체 모르겠네'
    },
    {
      id: 4,
      title: 'Issue occured: error_why...? help me please'
    },
    {
      id: 5,
      title: '바이트 문제가 아니라 그냥 위치로 자를 수 있어요'
    },
    {
      id: 6,
      title: '공백포함(21자35바이트)이상뒤에는 점을 붙인다'
    },
    {
      id: 7,
      title: '공백포함(21자35바이트)이상뒤에는 점을 붙인다'
    },
    {
      id: 8,
      title: '공백포함(21자35바이트)이상뒤에는 점을 붙인다'
    }
  ];

  return (
    <>
      <Header />
      <Search />
      <div className='board-title-container'>
        <div className='board-title-box'>
          <button className='back-button' onClick={() => navigate(-1)}>
            <img src={leftArrow} alt=''/>
          </button>
          <div className='board-title'>"Python" 질문 게시판</div>
          <div className='favorite-button-box'>
            <img src={favoriteStar} alt=''/>
          </div>
        </div>
        <div className='board-detail'>{boardTitle[boardId]}</div>
      </div>
      <div className='post-list'>
        {dummyData.map(post => {
          return (
            <PostSummary post={post} key={post.id} boardId={boardId} />
          )
        })}
      </div>
      <div className='write-post-container2'>
          <button
            className='write-post'
            onClick={() => navigate('/postwrite', {state: {boardId}})}>
              <div style={{height: '16px', width:'16px', marginLeft: '15px',marginRight:'10px'} }>
                <img src={pencil} alt="엑박" className='pencil2' style={{verticalAlign:'middle'}} />
              </div>
              <div style={{height: '14px'}}>
                <img src={writePost} alt="엑박" className='write-post-text' />
              </div>
          </button>
        </div>
    </>
  )
}