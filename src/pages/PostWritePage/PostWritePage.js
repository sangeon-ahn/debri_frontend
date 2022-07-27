import { useState } from 'react';
import Header from '../Header/Header';
import './PostWritePage.css';
import pencil from '../../assets/pencil.png';
import writePost from '../../assets/writePost.png';
// import selectButton from '../../assets/selectButton.png';
import leftArrow from '../../assets/leftArrow.png';
import PostWriteCancelModal from './PostWriteCancelModal/PostWriteCancelModal';
import PostWriteConfirmModal from './PostWriteConfirmModal/PostWriteConfirmModal';
import { useLocation } from 'react-router-dom';

export default function PostWritePage() {
  const [postTitle, setPostTitle] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [postContent, setPostContent] = useState('');
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const state = useLocation();

  function onClickSave() {
    setIsConfirmModalOpen(true);
  } 

  const handleSelectOption = (e) => {
    setSelectedOption(e.target.value);
  };
  // 게시판에서 글쓰기 버튼 누를 때 writepage로 링크타고 이동할텐데 이때 현재 있는 게시판 데이터 파라미터를 넘겨준 다음 이 데이터를 writepage에서 useParams로 받아서 useEffet setSelectedOption를 호출해주면 된다.
  
  return (
    <div>
      <PostWriteCancelModal
        isCancelModalOpen={isCancelModalOpen}
        closeCancelModal={() => setIsCancelModalOpen(false)}
        state={state}
      />
      <PostWriteConfirmModal
        isConfirmModalOpen={isConfirmModalOpen}
        closeConfirmModal={() => setIsConfirmModalOpen(false)}
        postTitle={postTitle}
        postContent={postContent}
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
            value={postTitle}
            placeholder='제목'
            onChange={(e) => setPostTitle(e.target.value)}
            spellCheck="false"
           />
        </div>
        <div className='select-board'>
          <div className='select-box'>
            <select name="option" onChange={handleSelectOption} value={selectedOption}>
              <option value="C">"C언어" 게시판</option>
              <option value="JAVA">"JAVA" 게시판</option>
              <option value="Python">"PYTHION" 게시판</option>
              <option value="free">"자유게시판"</option>
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
      <div style={{position:"fixed", zIndex: 1, width: '360px', height: '100px', backgroundColor: '#0A1123', bottom: '10px'}} ></div>
    </div>
  );
}