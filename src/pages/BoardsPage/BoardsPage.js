import React, { Component }  from 'react';
import './BoardsPage.css';
import logo from '../../assets/LOGO.png';
import profile from '../../assets/Profile.png';
import vector from '../../assets/Vector.png';
import searchIcon from '../../assets/searchIcon.png';
import { useState } from 'react';
import FavoriteBoards from './FavoriteBoards/FavoriteBoards';
import AllBoards from './AllBoards/AllBoards';

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
      <div className="header">
        <img src={logo} alt="액박" className="logo"></img>
        <img src={profile} alt="액박" className='profile'></img>
        <img src={vector} alt="액박" className='vector'></img>
      </div>
      <div className="search-bar">
        <img src={searchIcon} alt="액박" className="search-icon"></img>
        <input type="text" className="search" placeholder="검색어를 입력하세요" />
      </div>
      <div className='board-list'>
        <FavoriteBoards boards={boards} ></FavoriteBoards>
        <AllBoards boards={boards}></AllBoards>
      </div>
    </>
  )
}