import { useState } from 'react';
import './FavoriteBoards.css';
import toggleDown from '../../../assets/toggleDown.png';
import toggleUp from '../../../assets/toggleUp.png';
import favoriteStar from '../../../assets/favoriteStar.png';
import rightArrow from '../../../assets/rightArrow.png';

export default function FavoriteBoards({ boards }) {
  const [isOpened, setIsOpened] = useState(true);

  function handleFavoriteBoardsToggle() {
    setIsOpened(state => !state);
  }

  return (
    <div className="favorite-boards">
      <div className="favorite-title">
        <p>즐겨찾기된 게시판</p>
        <button onClick={
          handleFavoriteBoardsToggle
        }>
          {isOpened ? <img src={toggleDown} alt="엑박"></img> : <img src={toggleUp} alt="엑박"></img>}
        </button>
      </div>
      {isOpened &&
        <div>
          {boards.filter(board => board.favorite === true)
          .map(board => {
            return (
              <div className='board-menu' key={board.id}>
                <div>
                <button>
                  <img src={favoriteStar} alt="엑박"></img>
                </button>

                </div>
                <div>{board.text}</div>
                <img src={rightArrow} alt="엑박" width="9.44px" height="16.19px" className='right-arrow'/>
              </div>
            )
          })}
        </div>
      }
  </div>
  )
}