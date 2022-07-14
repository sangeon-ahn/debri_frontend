import './BoardsPage.css';
import { useState } from 'react';
import FavoriteBoards from './FavoriteBoards/FavoriteBoards';
import AllBoards from './AllBoards/AllBoards';
import Header from '../Header/Header';
import Search from '../Search/Search';
import LowBar from '../LowBar/LowBar';

export default function BoardsPage() {
  const dummyData = [
    {
      id: 1,
      text: ' "Python" 질문 게시판',
      favorite: true
    },
    {
      id: 2,
      text: '"Python" 게시판',
      favorite: true
    },
    {
      id: 3,
      text: '"C언어" 게시판',
      favorite: false
    },

    {
      id: 4,
      text: '"C언어" 게시판',
      favorite: false
    },
    {
      id: 5,
      text: '"JAVA" 게시판',
      favorite: false
    },
    {
      id: 6,
      text: '"JAVA" 질문 게시판',
      favorite: false
    },
    {
      id: 7,
      text: '개발 뉴스 & 이슈',
      favorite: false
    },
    {
      id: 8,
      text: '질문 게시판',
      favorite: false
    },
    {
      id: 9,
      text: '커리큘럼 질문 게시판',
      favorite: false
    },
  ]
  const [boards, setBoards] = useState(dummyData);

  return (
    <>
      <Header />
      <Search />
      <div className='board-list'>
        <FavoriteBoards boards={boards} />
        <AllBoards boards={boards} />
      </div>
      <LowBar />
    </>
  )
}