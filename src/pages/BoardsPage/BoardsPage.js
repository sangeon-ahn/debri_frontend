import './BoardsPage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteBoards from './FavoriteBoards/FavoriteBoards';
import AllBoards from './AllBoards/AllBoards';
import Header from '../Header/Header';
import Search from '../Search/Search';
import LowBar from '../LowBar/LowBar';

export default function BoardsPage() {
  return (
    <>
      <Header />
      <Search />
      <div className='board-list'>
        <FavoriteBoards/>
        <AllBoards/>
      </div>
    </>
  )
}