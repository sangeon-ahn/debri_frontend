import { useState } from 'react';
import Header from '../Header/Header';
import './PostWritePage.css';
import pencil from '../../assets/pencil.png';
import writePost from '../../assets/writePost.png';
import selectButton from '../../assets/selectButton.png';
import leftArrow from '../../assets/leftArrow.png';
import { useLocation, useNavigate } from 'react-router-dom';
import PostWriteCancelModal from './PostWriteCancelModal/PostWriteCancelModal';

export default function PostWritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  return (
    <>
      <PostWriteCancelModal
        isCancelModalOpen={isCancelModalOpen}
        closeCancelModal={() => setIsCancelModalOpen(false)}
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
           />
        </div>
        <div className='select-board'>
          <div className='select-box'>
            <select name="fruits">
              <option value="apple">"C언어" 게시판</option>
              <option value="orange">"JAVA" 게시판</option>
              <option value="grape">"PYTHION" 게시판</option>
              <option value="melon">"자유게시판"</option>
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
            >
          </textarea>
        </div>
        <div className='limit-length'>
          {content.length}/5000
        </div>
        <div className='write-post-container'>
          <button className='write-post'>
              <img src={pencil} alt="엑박" className='pencil' />
              <img src={writePost} alt="엑박" className='write-post-text' />
          </button>
        </div>
      </div>
    </>
  );
}