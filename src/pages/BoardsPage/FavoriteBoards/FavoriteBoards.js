import React, { Component }  from 'react';
import './FavoriteBoards.css';

export default function FavoriteBoards({ boards }) {


  return (
    <div className='favorite-boards'>
      <div className='favorite-title'>
        <p>즐겨찾기된 게시판</p>
        <button>토글버튼</button>
      </div>
    <div>
      {boards.filter(board => board.favorite === true)
      .map(board => {
        return (
          <div className='board-menu'>
            <button>즐찾버튼</button>
            <div key={board.key}>{board.text}</div>
            <div>이미지</div>
          </div>
        )
      })}
    </div>
  </div>
  )
}