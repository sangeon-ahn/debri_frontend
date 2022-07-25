import './BoardsPage.css';
import { useState } from 'react';
import FavoriteBoards from './FavoriteBoards/FavoriteBoards';
import AllBoards from './AllBoards/AllBoards';
import Header from '../Header/Header';
import Search from '../Search/Search';
import LowBar from '../LowBar/LowBar';

export default function BoardsPage() {
  // 여기 있는 더미데이터는 api로 안받아와도 될수도
  // 그냥 링크 path로 게시판 id 파라미터 보내서 링크타고 들어가서 렌더링 하는 방식
  // 근데 게시판 id를 알아야하니까 받아와야하긴 할듯
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
        {/* <FavoriteBoards/> */}
        <AllBoards/>
      </div>
    </>
  )
}