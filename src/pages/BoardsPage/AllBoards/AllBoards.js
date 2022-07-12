import React, { Component }  from 'react';
import './AllBoards.css';

export default function AllBoards({ boards }) {
  return (
    <div className='all-boards'>
      <div className='all-boards-title'>
        <p>전체 게시판</p>
        <button>토글버튼</button>
      </div>
    <div>
      {boards.filter(board => board.favorite === false)
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
  );
}
