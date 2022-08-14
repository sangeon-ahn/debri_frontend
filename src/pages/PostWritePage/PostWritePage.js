import React ,{useState, useEffect, useLayoutEffect}from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import './PostWritePage.css';
import pencil from '../../assets/pencil.png';
import writePost from '../../assets/writePost.png';
// import selectButton from '../../assets/selectButton.png';
import leftArrow from '../../assets/leftArrow.png';
import PostWriteCancelModal from './PostWriteCancelModal/PostWriteCancelModal';
import PostWriteConfirmModal from './PostWriteConfirmModal/PostWriteConfirmModal';
import { useLocation, useParams } from 'react-router-dom';

export default function PostWritePage() {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [boardList,setBoardList] = useState([]);
  const { state } = useLocation();
  const params = useParams();
  const [selectedOption, setSelectedOption] = useState(params.boardId);
  const [boardName, setBoardName] = useState('');

  console.log(params);

  useEffect(() => {
    getData();
    }, []);
    
  useEffect(() => {
      console.log('hh');
      handleBoardName(selectedOption);
  }, [selectedOption, boardList]);

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

  function onClickSave() {
    setIsConfirmModalOpen(true);
  } 

  const handleSelectOption = (e) => {
    setSelectedOption(e.target.value);
  };
  
  const handleBoardName = (boardId) => {
    if (boardList.length === 0) return;

    const board = boardList.find(board => {
      return board.boardIdx === Number(boardId);
    });

    setBoardName(board.boardName);
  };
  console.log('??');
  return (
    <>
      <Header />
      {boardName &&
      <>
        <PostWriteCancelModal
          isCancelModalOpen={isCancelModalOpen}
          closeCancelModal={() => setIsCancelModalOpen(false)}
          state={state}
          boardName={boardName}
        />
        <PostWriteConfirmModal
          isConfirmModalOpen={isConfirmModalOpen}
          closeConfirmModal={() => setIsConfirmModalOpen(false)}
          postTitle={postTitle}
          postContent={postContent}
          boardId={selectedOption}
          boardName={boardName}
        />
      </>
      }
      <div className='post-write-container'>
        <button className='go-past-button' onClick={() => setIsCancelModalOpen(true)}>
          <img src={leftArrow} alt=''/>
        </button>
        <div>
          <input
            type='text'
            className='title-input'
            value={postTitle}
            placeholder='제목'
            onChange={(e) => setPostTitle(e.target.value)}
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
            value={postContent}
            placeholder="내용 입력"
            onChange={(e) => setPostContent(e.target.value)}
            maxLength="5000"
            spellCheck="false"
            >
          </textarea>
        </div>
        <div className='limit-length'>
          {postContent.length}/5000
        </div>
        <div className='write-post-container'>
          <button
            className='write-post'
            onClick={onClickSave}>
              <img src={pencil} alt="엑박" className='pencil' />
              <img src={writePost} alt="엑박" className='write-post-text' />
          </button>
        </div>
      </div>
    </>
  );
}