import { useNavigate } from 'react-router-dom';
import favoriteStar from '../../assets/favoriteStar.png';
import rightArrow from '../../assets/rightArrow.png';

export default function ScrappedBoards(props) {
  const { scrappedBoards, onCancelScrap } = props;
  const navigate = useNavigate();

  return (
    <>
      {scrappedBoards && scrappedBoards.map((board) => (
        <div key={board.boardIdx}>
          <div className='board-menu'>
            <div>
              <button onClick={() => onCancelScrap(board.boardIdx)}>
                <img src={favoriteStar} alt="엑박" className='scrap-star'/>
              </button>
            </div>
            <div onClick={() => navigate(`/boards/${board.boardIdx}`)} className="board-name">
              <div style={{display:'flex', alignItems:'center'}}>
                <div>{board.boardName}</div>
                <img src={rightArrow} alt="엑박" width="9.44px" height="16.19px" className='right-arrow'/>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}