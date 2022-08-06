import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import './PostModifyPage.css';
import pencil from '../../assets/pencil.png';
import writePost from '../../assets/writePost.png';
import selectButton from '../../assets/selectButton.png';
import leftArrow from '../../assets/leftArrow.png';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PostModifyCancelModal from './PostModifyCancelModal/PostModifyCancelModal';
import PostModifyConfirmModal from './PostModifyConfirmModal/PostModifyConfirmModal';
import axios from 'axios';

export default function PostModifyPage() {
  const location = useLocation();

  const [title, setTitle] = useState(location.state.post.postName);
  const [content, setContent] = useState(location.state.post.contents);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [boardList,setBoardList] = useState([]);
  const params = useParams();
  const [selectedOption, setSelectedOption] = useState(params.boardId);

  useEffect(() => {
    getData();
    }, []);

  console.log(location);
  const handleSelectOption = (e) => {
    setSelectedOption(e.target.value);
  };

  const headers = {
    'ACCESS-TOKEN': `${JSON.parse(localStorage.getItem("userData")).jwt}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
    
  async function getData() {
    await axios.get(`/api/board/allList`, { headers }).then(
      (res) => {
        setBoardList(res.data.result);
      }
      )
      .catch((err)=>{
        console.log(err);
      });
  } ;

  return (
    <div>
      <PostModifyCancelModal
        isCancelModalOpen={isCancelModalOpen}
        closeCancelModal={() => setIsCancelModalOpen(false)}
      />
      <PostModifyConfirmModal
        isConfirmModalOpen={isConfirmModalOpen}
        closeConfirmModal={() => setIsConfirmModalOpen(false)}
        postContent={content}
        postIdx={location.state.post.postIdx}
      />
      <Header />
      <div className='post-write-container'>
        <button className='go-past-button' onClick={() => setIsCancelModalOpen(true)}>
          <img src={leftArrow} alt=''/>
        </button>
        <div>
          <input
            type='text'
            className='title-input'
            value={title}
            placeholder='제목'
            onChange={(e) => setTitle(e.target.value)}
            spellCheck="false"
           />
        </div>
        <div className='select-board'>
          <div className='select-box'>
            <select name="option" onChange={handleSelectOption} value={selectedOption}>
              {boardList.map((board) => (
                <option value={board.boardIdx} key={board.boardIdx}>{board.boardName}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <textarea
            className='content-textarea'
            type='text'
            value={content}
            placeholder="내용 입력"
            onChange={(e) => setContent(e.target.value)}
            maxLength="5000"
            spellCheck="false"
            >
          </textarea>
        </div>
        <div className='limit-length'>
          {content.length}/5000
        </div>
        <div className='write-post-container'>
          <button
            className='write-post'
            onClick={() => setIsConfirmModalOpen(true)}>
              <img src={pencil} alt="엑박" className='pencil' />
              <img src={writePost} alt="엑박" className='write-post-text' />
          </button>
        </div>
      </div>
      <div style={{position:"fixed", zIndex: 1, width: '360px', height: '100px', backgroundColor: '#0A1123', bottom: '10px'}} ></div>
    </div>
  );
}