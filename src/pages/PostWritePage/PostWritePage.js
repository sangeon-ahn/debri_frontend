import { useState } from 'react';
import Header from '../Header/Header';
import './PostWritePage.css';
import pencil from '../../assets/pencil.png';
import writePost from '../../assets/writePost.png';
import selectButton from '../../assets/selectButton.png';
import leftArrow from '../../assets/leftArrow.png';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PostWriteCancelModal from './PostWriteCancelModal/PostWriteCancelModal';
import PostWriteConfirmModal from './PostWriteConfirmModal/PostWriteConfirmModal';
import {useRecoilState} from 'recoil';
import {userId} from '../../Atom';
import axios from 'axios';

export default function PostWritePage() {
  const [title, setTitle] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [content, setContent] = useState('');
  // const [user, setUser] = useRecoilState(userId);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const location = useLocation();
  console.log(location);

  function onClickSave(){
    // postData(selectedOption, userId, title, content);
    setIsConfirmModalOpen(true);
  } 

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  async function postData(boardIdx,userIdx,postContent, postName) {
    try {
      const response = await axios.post(`/api/post/create`,
        JSON.stringify({boardIdx,userIdx,postContent, postName}),
        { headers }
      );
      console.log('리턴', response);
      alert('저장완료');

    } catch (error) {
      console.error(error);
    }
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
      />
      <PostWriteConfirmModal
        isConfirmModalOpen={isConfirmModalOpen}
        closeConfirmModal={() => setIsConfirmModalOpen(false)}
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