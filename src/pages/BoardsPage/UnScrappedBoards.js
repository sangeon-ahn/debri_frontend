import { useNavigate } from 'react-router-dom';
import emptyStar from '../../assets/emptyStar.png';
import rightArrow from '../../assets/rightArrow.png';

export default function UnScrappedBoards(props) {
  const { unScrappedBoards, onScrap } = props;
  const navigate = useNavigate();

  return (
    <>
      {unScrappedBoards && unScrappedBoards.map((board) => (
        <div key={board.boardIdx}>
            <div className='board-menu'>
              <div>
                <button onClick={() => onScrap(board.boardIdx)}>
                  <img src={emptyStar} alt="엑박" className='unscrap-star'/>
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